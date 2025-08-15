
export const VideoPlayer = () => {
  return (
    <div className="flex justify-center py-4 sm:py-16 px-4">
      <video
        className="rounded-xl w-full max-w-4xl"
        autoPlay
        loop
        muted
        playsInline 
      >
        <source src="/resources/application/familypainting.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};