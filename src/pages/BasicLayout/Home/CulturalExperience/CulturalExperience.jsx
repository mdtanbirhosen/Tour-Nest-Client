import { motion } from "framer-motion";

const CulturalExperience = () => {
  const festivals = [
    {
      name: "Eid-ul-Adha",
      description: "Celebrate the Bengali New Year with vibrant parades, music, and traditional food.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInf4_ha7CWyTDMW4H8Jz39mEx8He_Ld73YQ&s",
      date: "Varies (Islamic Calendar)",
    },
    {
      name: "Victory-day",
      description: "Experience the grandeur of this Hindu festival celebrated with lights, prayers, and cultural performances.",
      image: "https://www.bssnews.net/assets/news_photos/2022/12/16/image-100465-1671191862.jpg",
      date: "December 16th",
    },
    {
      name: "Eid-ul-Fitr",
      description: "Mark the end of Ramadan with grand feasts, prayers, and joyous celebrations across the country.",
      image: "https://assets.editorial.aetnd.com/uploads/2021/05/eid-al-fitr-gettyimages-1148084709.jpg",
      date: "Varies (Islamic Calendar)",
    },
  ];

  return (
    <div className="py-5 px-2 md:px-5  rounded-lg bg-blue-50">
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival, index) => (
          <motion.div
            key={index}
            className="card shadow-md overflow-hidden"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{festival.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{festival.description}</p>
              <p className="text-sm font-semibold text-gray-800 mt-2">Date: {festival.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CulturalExperience;
