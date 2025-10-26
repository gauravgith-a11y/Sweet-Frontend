import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";

const Gallery = () => {
  const images = [gallery1, gallery2, gallery3, gallery4, gallery5];

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
