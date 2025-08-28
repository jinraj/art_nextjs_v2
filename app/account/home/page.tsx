'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User2, ShoppingBag, Star, Palette, Users, Loader2 } from 'lucide-react';
// import { User, Artwork, Order, AppReview, Role } from '@/app/models/artwork';
import MyDetails from './MyDetails';
import AllOrders from './AllOrders';
import Reviews from './Reviews';
import AllArtworks from './AllArtworks';
import AllUsers from './AllUsers';
import { useSession } from 'next-auth/react';
import { AppReview, Artwork, Order, Role, User } from '@prisma/client';
import Link from 'next/link';
import AddArtwork from './AddArtwork';


// --- Main Component ---
const AccountPage: React.FC = () => {
  const { data: session } = useSession();
  // State to manage the active section and data
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<'details' | 'orders' | 'reviews' | 'artworks' | 'addartwork' | 'users'>('orders');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [artworks, setArtworks] = useState<Artwork[] | null>(null);
  const [reviews, setReviews] = useState<AppReview[] | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setCurrentUser(session.user as User);
    }
  }, [session]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        let res, data;

        switch (activeSection) {
          case 'orders':
            res = await fetch('/api/orders');
            data = await res.json();
            const sortedOrders = (data as Order[]).sort((a, b) => {
              if (a.status === 'Pending' && b.status !== 'Pending') return -1;
              if (a.status !== 'Pending' && b.status === 'Pending') return 1;
              return new Date(a.orderedAt).getTime() - new Date(b.orderedAt).getTime();
            });
            setOrders(sortedOrders);
            break;

          case 'artworks':
            if (currentUser.role === Role.Admin || currentUser.role === Role.Artist) {
              res = await fetch('/api/artworks/byrole');
              data = await res.json();
              setArtworks(data as Artwork[]);
            }
            break;

          case 'reviews':
            res = await fetch('/api/reviews/byrole');
            data = await res.json();
            setReviews(data as AppReview[]);
            break;

          case 'users':
            if (currentUser.role === Role.Admin) {
              res = await fetch('/api/users');
              data = await res.json();
              setAllUsers(data as User[]);
            }
            break;

          default:
            setOrders(null);
            setArtworks(null);
            setReviews(null);
            setAllUsers(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeSection, currentUser]);


  // Determine navigation items based on role
  const getMenuItems = () => {
    const items = [
      { id: 'details', label: 'My Details', icon: <User2 size={16} /> },
      { id: 'orders', label: 'Orders', icon: <ShoppingBag size={16} /> },
      { id: 'reviews', label: 'Reviews', icon: <Star size={16} /> },
    ];

    if (currentUser?.role === Role.Artist) {
      items.push({ id: 'artworks', label: 'My Artworks', icon: <Palette size={16} /> });
      items.push({ id: 'addartwork', label: 'Add Artwork', icon: <Palette size={16} /> });
    } else if (currentUser?.role === Role.Admin) {
      items.push(
        { id: 'artworks', label: 'All Artworks', icon: <Palette size={16} /> },
        { id: 'users', label: 'All Users', icon: <Users size={16} /> }
      );
      // Change "Orders" label for admin
      items[1].label = 'All Orders';
    }
    return items;
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom-antiflash-white p-4">
        <div className="text-center text-custom-paynes-gray">
          <p>Please <Link href="/auth/login" className='text-blue-600'>log in</Link> to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-custom-antiflash-white font-[Poppins] min-h-screen p-4 md:p-8 mt-20">

      <div className="mb-6 text-custom-paynes-gray">
        <h2 className="text-md font-bold">{currentUser.name}</h2>
        <p className="text-sm">{currentUser.email}</p>
        <p className="text-sm">{currentUser.role}</p>

      </div>

      {/* Top Navigation Tabs/Chips */}
      <div className="w-full flex flex-wrap justify-center items-center gap-2 p-4 md:p-0 mb-6 bg-custom-white rounded-xl shadow-md">
        {getMenuItems().map(item => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => setActiveSection(item.id as any)}
            className={`
                            flex items-center space-x-2 rounded-full transition-all duration-300
                            ${activeSection === item.id
                ? 'bg-custom-paynes-gray text-custom-white shadow-lg'
                : 'text-custom-paynes-gray bg-transparent hover:bg-custom-silver/30'
              }
                        `}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </div>

      {/* Main Display Area */}
      <div className="w-full">
        <Card className="border-none shadow-md rounded-xl p-6 md:p-10 bg-custom-white">
          <CardContent className="p-0">
            {/* Conditional Content Rendering: Show loader if data is being fetched */}
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="h-10 w-10 animate-spin text-custom-paynes-gray" />
              </div>
            ) : (
              // Render content only if currentUser is defined
              currentUser && (
                <>
                  {activeSection === 'details' && (
                    <MyDetails currentUser={currentUser} />
                  )}
                  {activeSection === 'orders' && (
                    <AllOrders orders={orders} currentUser={currentUser} />
                  )}
                  {activeSection === 'reviews' && (
                    <Reviews reviews={reviews} currentUser={currentUser} />
                  )}
                  {activeSection === 'artworks' && (
                    <AllArtworks displayArtworks={artworks} currentUser={currentUser} />
                  )}
                  {activeSection === 'addartwork' && (
                    <AddArtwork />
                  )}
                  {activeSection === 'users' &&
                    currentUser.role === Role.Admin && (
                      <AllUsers allUsers={allUsers} />
                    )}
                </>
              )
            )}
          </CardContent>

        </Card>
      </div>
    </div>
  );
};

export default AccountPage;
