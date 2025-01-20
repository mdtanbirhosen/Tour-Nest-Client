import { motion } from "framer-motion";

const CulinaryAdventures = () => {
  const dishes = [
    {
      name: "Hilsa Curry",
      description: "The national fish of Bangladesh cooked in a flavorful mustard sauce.",
      image: "https://thewannabecook.com/wp-content/uploads/2023/06/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%B6%E0%A7%87%E0%A6%B0-%E0%A6%89%E0%A6%B2%E0%A7%8D%E0%A6%B2%E0%A6%BE%E0%A6%B6-by-Shoma-Konkaboti.jpeg",
    },
    {
      name: "Biriyani",
      description: "A fragrant rice dish cooked with tender mutton or chicken, saffron, and spices.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8qJGXSu514bcjeD0dNoJnM0QP_feQPZjNOA&s",
    },
    {
      name: "Pithas",
      description: "Traditional Bengali cakes made from rice flour, coconut, and jaggery.",
      image: "https://thewannabecook.com/wp-content/uploads/2024/07/Bhapa-pitha.png",
    },
  ];

  return (
    <div className="py-10 px-5 bg-yellow-50">
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish, index) => (
          <motion.div
            key={index}
            className="card shadow-md overflow-hidden"
            whileHover={{ scale: 1.05, rotate: 2 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{dish.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{dish.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CulinaryAdventures;
