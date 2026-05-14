import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dayLabels = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const tonightOptions = [
  "Easy night",
  "Busy day",
  "Need leftovers",
  "Something fresh",
  "Low effort",
  "Feels like a treat",
  "Use things up",
  "High protein",
];

const mealSets = [
  [
    {
      id: 1,
      title: "Creamy Garlic Chicken Pasta",
      benefits: [
        { label: "Comforting", sub: "Creamy and satisfying", icon: "♡" },
        { label: "Quick", sub: "Ready in 20 mins", icon: "✦" },
        { label: "Protein packed", sub: "Keeps you full", icon: "⬢" },
      ],
      tag: "Quick & easy",
      match: "Best match",
      time: "20 mins",
      price: "££",
      kcal: "650 kcal",
      protein: "High protein",
      description:
        "Creamy garlic chicken with pasta, herbs and a lighter sauce. Comforting but still simple enough for a weeknight.",
      image:
        "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Teriyaki Salmon Rice Bowl",
      benefits: [
        { label: "High protein", sub: "Fuelled and filling", icon: "⬢" },
        { label: "Balanced", sub: "Carbs, protein and veg", icon: "♡" },
        { label: "Fresh", sub: "Light but satisfying", icon: "✦" },
      ],
      tag: "High protein",
      match: "Great choice",
      time: "25 mins",
      price: "££",
      kcal: "630 kcal",
      protein: "High protein",
      description:
        "Flaky teriyaki salmon with steamed rice, edamame, cucumber, spring onion and sesame seeds.",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Thai Green Chicken Curry",
      benefits: [
        { label: "Feels special", sub: "Restaurant-style flavour", icon: "♡" },
        { label: "Warming", sub: "Perfect cosy dinner", icon: "✦" },
        { label: "Balanced", sub: "Protein and veg", icon: "⬢" },
      ],
      tag: "Feels like a treat",
      match: "Cosy option",
      time: "30 mins",
      price: "£",
      kcal: "590 kcal",
      protein: "High protein",
      description:
        "A fragrant green curry with chicken, veg and rice. Big flavour without too much effort.",
      image:
        "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 4,
      title: "Harissa Chicken Couscous Bowl",
      benefits: [
        { label: "Fresh", sub: "Light and colourful", icon: "✦" },
        { label: "High protein", sub: "Keeps you full", icon: "⬢" },
        { label: "Easy prep", sub: "Simple bowl build", icon: "♡" },
      ],
      tag: "Something fresh",
      match: "Best match",
      time: "25 mins",
      price: "£",
      kcal: "610 kcal",
      protein: "High protein",
      description:
        "Harissa chicken with couscous, cucumber, yoghurt, herbs and crunchy salad bits.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Bean Chilli Wraps",
      benefits: [
        { label: "Low effort", sub: "Minimal cooking", icon: "✦" },
        { label: "Budget friendly", sub: "Great value", icon: "♡" },
        { label: "High fibre", sub: "Filling and balanced", icon: "⬢" },
      ],
      tag: "Low effort",
      match: "Easy win",
      time: "20 mins",
      price: "£",
      kcal: "540 kcal",
      protein: "High fibre",
      description:
        "Smoky bean chilli tucked into warm wraps with yoghurt, cheese and crunchy leaves.",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Pesto Chicken Traybake",
      benefits: [
        { label: "One tray", sub: "Less washing up", icon: "✦" },
        { label: "Leftovers", sub: "Good for tomorrow", icon: "♡" },
        { label: "High protein", sub: "Simple and filling", icon: "⬢" },
      ],
      tag: "Need leftovers",
      match: "Smart pick",
      time: "35 mins",
      price: "££",
      kcal: "620 kcal",
      protein: "High protein",
      description:
        "Chicken, potatoes, peppers and pesto roasted together. Minimal washing up and good leftovers.",
      image:
        "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 7,
      title: "Turkey Taco Rice Bowls",
      benefits: [
        { label: "Filling", sub: "Plenty of volume", icon: "♡" },
        { label: "High protein", sub: "Lean turkey base", icon: "⬢" },
        { label: "Quick", sub: "Weeknight friendly", icon: "✦" },
      ],
      tag: "High protein",
      match: "Great choice",
      time: "25 mins",
      price: "£",
      kcal: "610 kcal",
      protein: "High protein",
      description:
        "Spiced turkey mince with rice, lettuce, salsa, yoghurt and a little cheese.",
      image:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 8,
      title: "Lemon Chicken Orzo",
      benefits: [
        { label: "Fresh", sub: "Lemon and herbs", icon: "✦" },
        { label: "Balanced", sub: "Protein and carbs", icon: "♡" },
        { label: "One pan", sub: "Easy clean-up", icon: "⬢" },
      ],
      tag: "Low effort",
      match: "Easy win",
      time: "30 mins",
      price: "££",
      kcal: "580 kcal",
      protein: "High protein",
      description:
        "Tender chicken cooked with orzo, lemon, spinach and herbs in one pan.",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 9,
      title: "Halloumi Fajita Pittas",
      benefits: [
        { label: "Feels fun", sub: "Build-your-own", icon: "♡" },
        { label: "Fast", sub: "Under 25 mins", icon: "✦" },
        { label: "Vegetarian", sub: "Still satisfying", icon: "⬢" },
      ],
      tag: "Feels like a treat",
      match: "Fun option",
      time: "25 mins",
      price: "££",
      kcal: "640 kcal",
      protein: "Vegetarian",
      description:
        "Grilled halloumi with peppers, onions, yoghurt and warm pittas.",
      image:
        "https://images.unsplash.com/photo-1604908176997-431652084574?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 10,
      title: "Ginger Beef Noodles",
      benefits: [
        { label: "Big flavour", sub: "Ginger and soy", icon: "♡" },
        { label: "Fast", sub: "Stir-fry speed", icon: "✦" },
        { label: "Protein", sub: "Beef strips", icon: "⬢" },
      ],
      tag: "Quick & easy",
      match: "Best match",
      time: "20 mins",
      price: "££",
      kcal: "670 kcal",
      protein: "High protein",
      description:
        "Beef strips, noodles and crunchy vegetables in a quick ginger soy sauce.",
      image:
        "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 11,
      title: "Cajun Chicken Sweet Potato",
      benefits: [
        { label: "Balanced", sub: "Protein and carbs", icon: "♡" },
        { label: "Colourful", sub: "Plenty of veg", icon: "✦" },
        { label: "Filling", sub: "Sweet potato base", icon: "⬢" },
      ],
      tag: "High protein",
      match: "Smart pick",
      time: "35 mins",
      price: "£",
      kcal: "620 kcal",
      protein: "High protein",
      description:
        "Cajun chicken with roasted sweet potato, peppers, yoghurt and salad.",
      image:
        "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 12,
      title: "Prawn Fried Rice",
      benefits: [
        { label: "Uses things up", sub: "Great for leftover rice", icon: "✦" },
        { label: "Fast", sub: "Ready quickly", icon: "♡" },
        { label: "Light protein", sub: "Prawns and egg", icon: "⬢" },
      ],
      tag: "Use things up",
      match: "Clever option",
      time: "20 mins",
      price: "££",
      kcal: "560 kcal",
      protein: "High protein",
      description:
        "Prawns, egg, rice and vegetables tossed together with soy and spring onion.",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 13,
      title: "Chicken Shawarma Flatbreads",
      benefits: [
        { label: "Feels special", sub: "Takeaway energy", icon: "♡" },
        { label: "Quick", sub: "Simple assembly", icon: "✦" },
        { label: "Protein", sub: "Chicken and yoghurt", icon: "⬢" },
      ],
      tag: "Feels like a treat",
      match: "Great choice",
      time: "30 mins",
      price: "£",
      kcal: "650 kcal",
      protein: "High protein",
      description:
        "Spiced chicken, salad, yoghurt sauce and warm flatbreads.",
      image:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 14,
      title: "Tuna Nicoise Salad Bowl",
      benefits: [
        { label: "Fresh", sub: "Light but filling", icon: "✦" },
        { label: "Balanced", sub: "Protein, carbs and veg", icon: "♡" },
        { label: "No fuss", sub: "Easy assembly", icon: "⬢" },
      ],
      tag: "Something fresh",
      match: "Fresh pick",
      time: "15 mins",
      price: "£",
      kcal: "520 kcal",
      protein: "High protein",
      description:
        "Tuna, eggs, potatoes, green beans, tomatoes and a sharp dressing.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 15,
      title: "Lentil Bolognese Pasta",
      benefits: [
        { label: "Budget friendly", sub: "Store cupboard base", icon: "♡" },
        { label: "High fibre", sub: "Lentils and veg", icon: "⬢" },
        { label: "Comforting", sub: "Pasta night", icon: "✦" },
      ],
      tag: "Low effort",
      match: "Easy win",
      time: "30 mins",
      price: "£",
      kcal: "570 kcal",
      protein: "High fibre",
      description:
        "A rich lentil tomato sauce with pasta and parmesan.",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 16,
      title: "Chicken Caesar Wraps",
      benefits: [
        { label: "Quick", sub: "Minimal cooking", icon: "✦" },
        { label: "Familiar", sub: "Easy crowd pleaser", icon: "♡" },
        { label: "Protein", sub: "Chicken and yoghurt", icon: "⬢" },
      ],
      tag: "Quick & easy",
      match: "Best match",
      time: "20 mins",
      price: "£",
      kcal: "590 kcal",
      protein: "High protein",
      description:
        "Chicken, crunchy lettuce, parmesan and a lighter Caesar-style sauce in wraps.",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 17,
      title: "Miso Salmon Noodles",
      benefits: [
        { label: "Fresh", sub: "Light and savoury", icon: "✦" },
        { label: "High protein", sub: "Salmon base", icon: "⬢" },
        { label: "Fast", sub: "Noodles cook quickly", icon: "♡" },
      ],
      tag: "High protein",
      match: "Smart pick",
      time: "25 mins",
      price: "££",
      kcal: "620 kcal",
      protein: "High protein",
      description:
        "Miso-glazed salmon with noodles, pak choi and sesame.",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 18,
      title: "Veggie Burrito Bowls",
      benefits: [
        { label: "Colourful", sub: "Loads of veg", icon: "✦" },
        { label: "High fibre", sub: "Beans and rice", icon: "⬢" },
        { label: "Flexible", sub: "Easy to customise", icon: "♡" },
      ],
      tag: "Use things up",
      match: "Clever option",
      time: "25 mins",
      price: "£",
      kcal: "560 kcal",
      protein: "High fibre",
      description:
        "Rice, beans, peppers, sweetcorn, salsa and yoghurt in a flexible bowl.",
      image:
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=80",
    },
  ],
  [
    {
      id: 19,
      title: "Sticky Chicken Rice Bowl",
      benefits: [
        { label: "Satisfying", sub: "Sticky sauce and rice", icon: "♡" },
        { label: "Quick", sub: "Simple pan cook", icon: "✦" },
        { label: "Protein", sub: "Chicken thighs", icon: "⬢" },
      ],
      tag: "Easy night",
      match: "Great choice",
      time: "25 mins",
      price: "£",
      kcal: "640 kcal",
      protein: "High protein",
      description:
        "Sticky soy chicken with rice, cucumber, spring onions and sesame.",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 20,
      title: "Sausage Gnocchi Bake",
      benefits: [
        { label: "Comforting", sub: "Cheesy and cosy", icon: "♡" },
        { label: "Low effort", sub: "Bake and serve", icon: "✦" },
        { label: "Leftovers", sub: "Good tomorrow", icon: "⬢" },
      ],
      tag: "Need leftovers",
      match: "Cosy option",
      time: "35 mins",
      price: "££",
      kcal: "700 kcal",
      protein: "Filling",
      description:
        "Gnocchi, sausage, tomato sauce and mozzarella baked until golden.",
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 21,
      title: "Falafel Mezze Plate",
      benefits: [
        { label: "Fresh", sub: "Crunchy and colourful", icon: "✦" },
        { label: "Flexible", sub: "Pick and mix", icon: "♡" },
        { label: "Plant protein", sub: "Falafel and hummus", icon: "⬢" },
      ],
      tag: "Something fresh",
      match: "Fresh pick",
      time: "20 mins",
      price: "£",
      kcal: "580 kcal",
      protein: "Vegetarian",
      description:
        "Falafel, hummus, salad, warm pitta and pickled veg.",
      image:
        "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80",
    },
  ],
];


function getMealDays(startDay, nextShopDay) {
  const startIndex = days.indexOf(startDay);
  const endIndex = days.indexOf(nextShopDay);

  const result = [];
  let i = startIndex;

  while (true) {
    result.push(days[i]);
    i = (i + 1) % days.length;

    if (i === endIndex) break;
    if (result.length === 7) break;
  }

  return result;
}

function formatCookingTime(minutes) {
  if (minutes < 60) return `${minutes} mins`;
  if (minutes === 60) return "1 hour";
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function getMealMinutes(meal) {
  const match = String(meal.time || "").match(/\d+/);
  return match ? Number(match[0]) : 999;
}

function MealCard({ meal, index, onMoreInfo, onCustomise }) {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 120 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 90) onCustomise(meal);
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`relative rounded-[1.75rem] overflow-hidden shadow-lg border border-white bg-white ${
        index > 0 ? "-mt-7" : ""
      }`}
    >
      <button onClick={() => onMoreInfo(meal)} className="block w-full text-left">
        <div className="relative h-[190px]">
          <img
            src={meal.image}
            alt={meal.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {index === 0 && (
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow">
              {meal.match}
            </div>
          )}

          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="text-white text-2xl font-bold leading-tight max-w-[260px]">
              {meal.title}
            </h2>

            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="bg-white text-purple-950 rounded-full px-3 py-2 text-xs font-semibold">
                ◷ {meal.time}
              </span>
              <span className="bg-white text-purple-950 rounded-full px-3 py-2 text-xs font-semibold">
                ✦ {meal.tag}
              </span>
              <span className="bg-white text-purple-950 rounded-full px-3 py-2 text-xs font-semibold">
                {meal.price}
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function MealDetail({ meal, onClose, onCustomise }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="absolute inset-0 bg-white z-30 overflow-y-auto pb-28"
    >
      <div className="px-6 pt-10 pb-5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="h-12 w-12 rounded-full bg-purple-50 text-purple-600 text-3xl flex items-center justify-center"
        >
          ‹
        </button>

        <div className="text-center">
          <p className="font-bold text-xl text-purple-950">Monday</p>
          <p className="text-purple-400">Based on your choices</p>
        </div>

        <button className="h-12 w-12 rounded-full bg-purple-50 text-purple-600 text-xl">
          ≡
        </button>
      </div>

      <div className="mx-5 rounded-[2rem] overflow-hidden shadow-xl border border-purple-100">
        <div className="relative h-[260px]">
          <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white text-purple-700 text-3xl"
          >
            ×
          </button>
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {meal.match}
          </div>
          <h1 className="absolute bottom-6 left-6 text-white text-4xl font-bold leading-tight max-w-[320px]">
            {meal.title}
          </h1>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-4 gap-3 text-[11px] mb-5">
            <div>
              <p className="font-bold text-purple-950">◷ {meal.time}</p>
              <p className="text-purple-400">Prep & cook</p>
            </div>
            <div>
              <p className="font-bold text-purple-950">⬢ {meal.protein}</p>
              <p className="text-purple-400">Per serving</p>
            </div>
            <div>
              <p className="font-bold text-purple-950">▮ {meal.kcal}</p>
              <p className="text-purple-400">Per serving</p>
            </div>
            <div>
              <p className="font-bold text-purple-950">{meal.price}</p>
              <p className="text-purple-400">Price guide</p>
            </div>
          </div>

          <p className="text-purple-900 text-lg leading-relaxed mb-6">{meal.description}</p>

          <h3 className="text-xl font-bold text-purple-950 mb-4">Why you'll love it</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {(meal.benefits || [
              { label: "Quick & easy", sub: "Ready without stress", icon: "✦" },
              { label: "High protein", sub: "Fuelled and filling", icon: "⬢" },
              { label: "Balanced", sub: "Carbs, protein and veg", icon: "♡" },
            ]).map((item) => (
              <div key={item.label} className="border-r last:border-r-0 border-purple-100 pr-2">
                <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mb-2 text-xl font-black">
                  {item.icon}
                </div>
                <p className="font-semibold text-sm text-purple-950">{item.label}</p>
                <p className="text-xs text-purple-400">{item.sub}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onCustomise(meal)}
            className="w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-3xl py-5 font-bold text-xl"
          >
            Looks good →
          </button>
        </div>
      </div>

    </motion.div>
  );
}

function getComponentOptions(meal) {
  const title = meal.title.toLowerCase();

  if (title.includes("bean chilli")) {
    return {
      Protein: [
        {
          title: "Mixed Beans",
          detail: "High fibre",
          image:
            "https://images.unsplash.com/photo-1589249886753-0c5c2c69f34f?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Chicken",
          detail: "High protein",
          image:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Beef Mince",
          detail: "Classic chilli",
          image:
            "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Carbs: [
        {
          title: "Soft Wraps",
          detail: "Easy to build",
          image:
            "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Rice",
          detail: "More filling",
          image:
            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Tortilla Chips",
          detail: "Crunchy option",
          image:
            "https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Veg: [
        {
          title: "Peppers, Onion, Sweetcorn",
          detail: "Colourful veg",
          image:
            "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Avocado & Lettuce",
          detail: "Fresh finish",
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Tomato Salsa",
          detail: "Bright and sharp",
          image:
            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
        },
      ],
    };
  }

  if (title.includes("salmon")) {
    return {
      Protein: [
        {
          title: "Teriyaki Salmon",
          detail: "High protein",
          image:
            "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Chicken Breast",
          detail: "Lean protein",
          image:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Crispy Tofu",
          detail: "Plant-based",
          image:
            "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Carbs: [
        {
          title: "Steamed Rice",
          detail: "Balanced energy",
          image:
            "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Noodles",
          detail: "Quick swap",
          image:
            "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Couscous",
          detail: "Light and easy",
          image:
            "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Veg: [
        {
          title: "Edamame, Cucumber, Spring Onion",
          detail: "Fresh and crunchy",
          image:
            "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Tenderstem Broccoli",
          detail: "Green and crunchy",
          image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Pak Choi",
          detail: "Fast stir-fry veg",
          image:
            "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=500&q=80",
        },
      ],
    };
  }

  if (title.includes("pasta")) {
    return {
      Protein: [
        {
          title: "Garlic Chicken",
          detail: "High protein",
          image:
            "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Prawns",
          detail: "Light protein",
          image:
            "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Mushrooms",
          detail: "Vegetarian option",
          image:
            "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Carbs: [
        {
          title: "Linguine",
          detail: "Classic pasta",
          image:
            "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Wholewheat Pasta",
          detail: "Higher fibre",
          image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Gnocchi",
          detail: "Comfort swap",
          image:
            "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
        },
      ],
      Veg: [
        {
          title: "Spinach & Peas",
          detail: "Easy greens",
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Tenderstem Broccoli",
          detail: "Crunchy side",
          image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80",
        },
        {
          title: "Roasted Courgette",
          detail: "Light and fresh",
          image:
            "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=500&q=80",
        },
      ],
    };
  }

  return {
    Protein: [
      {
        title: "Chicken",
        detail: "High protein",
        image:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Salmon",
        detail: "Omega-3 rich",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Tofu",
        detail: "Plant-based",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Carbs: [
      {
        title: "Rice",
        detail: "Balanced energy",
        image:
          "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Potatoes",
        detail: "Filling option",
        image:
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Couscous",
        detail: "Light and easy",
        image:
          "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=500&q=80",
      },
    ],
    Veg: [
      {
        title: "Mixed Greens",
        detail: "Fresh veg",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Broccoli",
        detail: "High fibre",
        image:
          "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80",
      },
      {
        title: "Peppers",
        detail: "Colourful veg",
        image:
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  };
}

function CustomiseScreen({ meal, onBack, onConfirm }) {
  const optionsByType = getComponentOptions(meal);

  const [componentIndexes, setComponentIndexes] = useState({
    Protein: 0,
    Carbs: 0,
    Veg: 0,
  });

  const [showNutrition, setShowNutrition] = useState(false);

  const rows = [
    { type: "Protein", options: optionsByType.Protein },
    { type: "Carbs", options: optionsByType.Carbs },
    { type: "Veg", options: optionsByType.Veg },
  ];

  const swapComponent = (type, direction) => {
    const row = rows.find((item) => item.type === type);
    const max = row.options.length;

    setComponentIndexes((current) => ({
      ...current,
      [type]: (current[type] + direction + max) % max,
    }));
  };

  const selectedComponents = rows.reduce((acc, row) => {
    acc[row.type] = row.options[componentIndexes[row.type]];
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      className="absolute inset-0 bg-white z-40 overflow-hidden"
    >
      <div className="px-6 pt-7 pb-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 text-3xl flex items-center justify-center"
        >
          ‹
        </button>

        <div className="text-center">
          <h1 className="font-bold text-[25px] leading-tight text-purple-950">Customise your meal</h1>
          <p className="text-purple-400 text-sm">Make it perfect for you</p>
        </div>

        <button className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 text-lg">
          ≡
        </button>
      </div>

      <div className="mx-5 rounded-[1.35rem] overflow-hidden shadow-sm border border-purple-100 mb-3">
        <div className="relative h-[96px]">
          <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute top-2.5 left-3 bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
            ✓ Selected
          </div>
          <h2 className="absolute bottom-3 left-4 right-4 text-xl leading-tight font-bold text-white">
            {meal.title}
          </h2>
        </div>

        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-2 text-[10px]">
            <p><b>◷ {meal.time}</b><br /><span className="text-purple-400">Prep</span></p>
            <p><b>⬢ {meal.protein}</b><br /><span className="text-purple-400">Protein</span></p>
            <p><b>▮ {meal.kcal}</b><br /><span className="text-purple-400">Energy</span></p>
            <p><b>{meal.price}</b><br /><span className="text-purple-400">Price</span></p>
          </div>
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-[25px] leading-tight font-bold text-purple-950">Customise your bowl</h2>
        <p className="text-purple-400 text-sm mb-2">Swipe or tap to swap each component</p>

        <div className="space-y-2">
          {rows.map((row) => {
            const selectedIndex = componentIndexes[row.type];
            const selected = row.options[selectedIndex];

            return (
              <motion.div
                key={row.type}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 60) swapComponent(row.type, -1);
                  if (info.offset.x < -60) swapComponent(row.type, 1);
                }}
                className="rounded-2xl border border-purple-100 p-3 flex items-center gap-3 shadow-sm bg-white"
              >
                <button onClick={() => swapComponent(row.type, -1)} className="text-3xl text-purple-600">
                  ‹
                </button>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-xs text-purple-950">{row.type}</p>
                  <h3 className="font-bold text-[19px] leading-tight text-purple-950">
                    {selected.title}
                  </h3>
                  <p className="text-xs text-purple-400">{selected.detail}</p>

                  <div className="flex gap-1 mt-1.5">
                    {row.options.map((_, dot) => (
                      <span
                        key={dot}
                        className={`h-2 w-2 rounded-full ${
                          dot === selectedIndex ? "bg-purple-600" : "bg-purple-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative h-16 w-24 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-x-2 bottom-1 h-8 rounded-full bg-purple-50 blur-sm" />
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="relative z-10 max-h-16 max-w-24 object-contain mix-blend-multiply drop-shadow-md rounded-xl"
                  />
                </div>

                <button onClick={() => swapComponent(row.type, 1)} className="text-3xl text-purple-600">
                  ›
                </button>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => setShowNutrition(true)}
          className="mt-3 w-full bg-purple-50 rounded-2xl p-3 text-left"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-bold text-purple-950 text-sm">
                {meal.kcal} • High protein • High fibre
              </p>
              <p className="text-purple-400 text-sm">
                Great balance of protein, carbs and veg
              </p>
            </div>

            <p className="text-purple-700 font-bold whitespace-nowrap">
              View details →
            </p>
          </div>
        </button>

        <button
          onClick={() => onConfirm(meal, selectedComponents)}
          className="mt-3 w-full bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-3xl py-4 font-bold text-xl"
        >
          Looks good →
        </button>
      </div>

      <AnimatePresence>
        {showNutrition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-purple-950/25 z-50 flex items-end"
          >
            <motion.div
              initial={{ y: 260 }}
              animate={{ y: 0 }}
              exit={{ y: 260 }}
              className="bg-white rounded-t-[2rem] p-6 w-full"
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-sm text-purple-500 font-bold">Nutrition detail</p>
                  <h2 className="text-2xl font-bold text-purple-950">{meal.title}</h2>
                </div>

                <button
                  onClick={() => setShowNutrition(false)}
                  className="h-10 w-10 rounded-full bg-purple-50 text-purple-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["Calories", meal.kcal],
                  ["Protein", "38g"],
                  ["Carbs", "62g"],
                  ["Fat", "19g"],
                  ["Fibre", "8g"],
                  ["Salt", "1.2g"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-purple-50 rounded-2xl p-4">
                    <p className="text-purple-950 font-bold text-xl">{value}</p>
                    <p className="text-purple-400 text-sm">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ShoppingListScreen({ plannedMeals }) {
  const mealCount = Object.keys(plannedMeals).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 bg-white z-30 px-6 pt-10 pb-6"
    >
      <p className="text-sm text-purple-500 font-bold mb-2">Week complete</p>
      <h1 className="text-4xl font-extrabold text-purple-950 leading-tight">
        Your shopping list is ready
      </h1>
      <p className="text-purple-400 mt-3">
        Built from {mealCount} planned meal{mealCount === 1 ? "" : "s"}.
      </p>

      <div className="mt-8 space-y-4">
        {[
          ["Protein", "Chicken breast, salmon fillets, Greek yoghurt"],
          ["Carbs", "Rice, pasta, wraps"],
          ["Veg", "Cucumber, edamame, spring onion, broccoli"],
          ["Store cupboard", "Teriyaki sauce, garlic, herbs, sesame seeds"],
        ].map(([section, items]) => (
          <div key={section} className="bg-purple-50 rounded-3xl p-5">
            <h2 className="text-xl font-bold text-purple-950">{section}</h2>
            <p className="text-purple-500 mt-2">{items}</p>
          </div>
        ))}
      </div>

      <button className="absolute left-6 right-6 bottom-6 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-3xl py-5 font-bold text-xl">
        Looks good — shop this list
      </button>
    </motion.div>
  );
}

export default function App() {
  const [shoppingDay, setShoppingDay] = useState("Wed");
  const [nextShopDay, setNextShopDay] = useState("Wed");
  const [planningStarted, setPlanningStarted] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);

  const [selectedPeople, setSelectedPeople] = useState(["Ben", "Abby"]);
  const [selectedTonight, setSelectedTonight] = useState(["Busy day", "High protein"]);
  const [cookingTime, setCookingTime] = useState(30);

  const [mealSetIndex, setMealSetIndex] = useState(0);
  const [detailMeal, setDetailMeal] = useState(null);
  const [customiseMeal, setCustomiseMeal] = useState(null);
  const [showDaySummary, setShowDaySummary] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [plannedMeals, setPlannedMeals] = useState({});
  const [showShoppingList, setShowShoppingList] = useState(false);

  const mealDays = useMemo(
    () => getMealDays(shoppingDay, nextShopDay),
    [shoppingDay, nextShopDay]
  );

  const currentDay = mealDays[currentDayIndex];
  const currentDayLabel = dayLabels[currentDay];

  const meals = useMemo(() => {
    const filteredMeals = mealSets
      .flat()
      .filter((meal) => getMealMinutes(meal) <= cookingTime);

    if (filteredMeals.length === 0) return [];

    const startIndex = (mealSetIndex * 3) % filteredMeals.length;

    return [...filteredMeals, ...filteredMeals].slice(startIndex, startIndex + 3);
  }, [cookingTime, mealSetIndex]);

  const startPlanning = () => {
    setCurrentDayIndex(0);
    setMealSetIndex(0);
    setPlannedMeals({});
    setShowShoppingList(false);
    setPlanningStarted(true);
    setShowDayModal(true);
  };

  const advanceToNextDay = (meal = null, components = null) => {
    if (meal) {
      setPlannedMeals((current) => ({
        ...current,
        [currentDay]: {
          meal,
          components,
        },
      }));
    }

    setDetailMeal(null);
    setCustomiseMeal(null);
    setShowDayModal(false);

    if (currentDayIndex >= mealDays.length - 1) {
      setShowShoppingList(true);
      return;
    }

    setCurrentDayIndex((current) => current + 1);
    setMealSetIndex((current) => (current + 1) % mealSets.length);
    setShowDayModal(true);
  };

  const togglePerson = (person) => {
    setSelectedPeople((current) =>
      current.includes(person)
        ? current.filter((item) => item !== person)
        : [...current, person]
    );
  };

  const toggleTonightOption = (option) => {
    setSelectedTonight((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const shuffleMeals = () => {
    setMealSetIndex((current) => (current + 1) % mealSets.length);
  };

  return (
    <div className="min-h-screen bg-[#eee7ff] flex justify-center items-start py-4">
      <div className="w-[430px] h-[932px] bg-white rounded-[2rem] shadow-2xl overflow-hidden relative">
        {!planningStarted ? (
          <>
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white px-6 pt-10 pb-8">
              <p className="text-sm opacity-90 mb-3">Meal planning made lighter</p>
              <h1 className="text-4xl font-bold tracking-tight leading-tight">Build your week</h1>
              <p className="text-sm opacity-95 mt-4 leading-relaxed max-w-[280px]">
                Tell us when this shop starts and when you'll next shop.
              </p>
            </div>

            <div className="px-5 py-7 space-y-8">
              <section className="bg-white rounded-[2rem] p-7 shadow-sm border border-purple-100 space-y-6">
                <h2 className="font-semibold text-[26px] leading-tight text-purple-950">
                  When are you going shopping?
                </h2>

                <div className="grid grid-cols-4 gap-3">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setShoppingDay(day)}
                      className={`rounded-2xl py-4 text-sm font-semibold transition-all ${
                        shoppingDay === day
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-[2rem] p-7 shadow-sm border border-purple-100 space-y-6">
                <h2 className="font-semibold text-[26px] leading-tight text-purple-950">
                  When will you next shop?
                </h2>

                <div className="grid grid-cols-4 gap-3">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setNextShopDay(day)}
                      className={`rounded-2xl py-4 text-sm font-semibold transition-all ${
                        nextShopDay === day
                          ? "bg-purple-600 text-white shadow-md"
                          : "bg-purple-50 text-purple-700"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </section>

              <button
                onClick={startPlanning}
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-2xl py-5 font-semibold text-base shadow-lg active:scale-[0.98] transition"
              >
                Start planning meals
              </button>
            </div>
          </>
        ) : (
          <div className={showDayModal ? "blur-sm pointer-events-none" : "pb-28"}>
            <div className="px-6 pt-10 pb-5 relative flex items-center justify-center">
              <button
                onClick={() => setShowDaySummary((current) => !current)}
                className="font-bold text-xl text-purple-950"
              >
                {currentDayLabel}⌄
              </button>

              <button
                onClick={() => setShowDayModal(true)}
                className="absolute right-6 top-8 h-12 w-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center text-xl shadow-sm"
              >
                ☰
              </button>

              {showDaySummary && (
                <div className="absolute top-20 left-6 right-6 bg-white border border-purple-100 rounded-2xl shadow-xl p-4 z-20">
                  <p className="text-sm font-bold text-purple-950 mb-3">
                    Week plan
                  </p>

                  <div className="space-y-2">
                    {mealDays.map((day, index) => (
                      <div
                        key={day}
                        className="flex items-center justify-between gap-3"
                      >
                        <span
                          className={`px-3 py-2 rounded-full text-xs font-semibold ${
                            index === currentDayIndex
                              ? "bg-purple-600 text-white"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {dayLabels[day]}
                        </span>

                        <span className="text-xs text-purple-400 text-right">
                          {plannedMeals[day]
                            ? plannedMeals[day].meal.title
                            : index === currentDayIndex
                            ? "Choosing now"
                            : "Not planned yet"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6">
              <h1 className="text-4xl font-extrabold text-purple-950 leading-tight">
                What sounds good?
              </h1>
              <p className="text-xl text-purple-400 mt-1">Based on your choices</p>

              <div className="flex flex-wrap gap-2 mt-4 mb-4">
                {selectedTonight.slice(0, 3).map((option) => (
                  <span
                    key={option}
                    className="bg-purple-50 text-purple-800 rounded-full px-3.5 py-2.5 text-xs font-bold"
                  >
                    ✦ {option}
                  </span>
                ))}
                {selectedPeople.length > 0 && (
                  <span className="bg-purple-50 text-purple-800 rounded-full px-3.5 py-2.5 text-xs font-bold">
                    {selectedPeople.join(" + ")}
                  </span>
                )}
              </div>

              <div className="space-y-0">
                {meals.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-purple-100 bg-purple-50 p-6 text-center">
                    <p className="font-bold text-purple-950">No meals match this cooking time.</p>
                    <p className="text-sm text-purple-500 mt-2">Try increasing the max cooking time to see more options.</p>
                  </div>
                ) : (
                  meals.map((meal, index) => (
                    <MealCard
                      key={meal.id}
                      meal={meal}
                      index={index}
                      onMoreInfo={setDetailMeal}
                      onCustomise={setCustomiseMeal}
                    />
                  ))
                )}
              </div>

              <button
                onClick={shuffleMeals}
                className="mt-4 w-full border border-purple-100 rounded-3xl py-5 text-purple-700 font-bold text-xl shadow-sm"
              >
                ⟳ Shuffle all
              </button>
            </div>

          </div>
        )}

        <AnimatePresence>
          {showDayModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/25 flex items-end z-20"
            >
              <motion.div
                initial={{ y: 420 }}
                animate={{ y: 0 }}
                exit={{ y: 420 }}
                transition={{ type: "spring", damping: 28, stiffness: 280 }}
                className="bg-white rounded-t-[2rem] p-6 w-full space-y-6"
              >
                <div>
                  <p className="text-sm text-purple-500 font-medium mb-2">Before we choose</p>
                  <h2 className="text-2xl font-semibold text-purple-950">
                    What does {currentDayLabel} look like?
                  </h2>
                </div>

                <div>
                  <p className="font-medium mb-3 text-purple-950">Who's eating?</p>
                  <div className="flex flex-wrap gap-2">
                    {["Ben", "Abby", "Guests"].map((person) => {
                      const isSelected = selectedPeople.includes(person);

                      return (
                        <button
                          key={person}
                          onClick={() => togglePerson(person)}
                          className={`px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                            isSelected
                              ? "bg-purple-600 text-white shadow-sm"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {person}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-3 text-purple-950">What's tonight like?</p>
                  <div className="flex flex-wrap gap-2">
                    {tonightOptions.map((option) => {
                      const isSelected = selectedTonight.includes(option);

                      return (
                        <button
                          key={option}
                          onClick={() => toggleTonightOption(option)}
                          className={`rounded-full px-3.5 py-2.5 text-xs font-semibold transition-all ${
                            isSelected
                              ? "bg-purple-600 text-white shadow-sm"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <p className="font-medium text-purple-950">Max cooking time</p>
                    <p className="text-sm font-semibold text-purple-600">
                      {formatCookingTime(cookingTime)}
                    </p>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="120"
                    step="5"
                    value={cookingTime}
                    onChange={(event) => setCookingTime(Number(event.target.value))}
                    className="w-full accent-purple-600"
                  />

                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>10 mins</span>
                    <span>2 hours</span>
                  </div>
                </div>

                {selectedPeople.length === 0 && (
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                    <p className="text-sm font-semibold text-purple-900 mb-1">
                      No one's eating at home?
                    </p>
                    <p className="text-sm text-purple-700 leading-relaxed">
                      We can skip planning for tonight and move on to the next day.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (selectedPeople.length === 0) {
                      advanceToNextDay();
                    } else {
                      setShowDayModal(false);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white rounded-2xl py-4 font-semibold"
                >
                  {selectedPeople.length === 0 ? "Skip this night" : "Show my options"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showShoppingList && (
            <ShoppingListScreen plannedMeals={plannedMeals} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {detailMeal && !customiseMeal && (
            <MealDetail
              meal={detailMeal}
              onClose={() => setDetailMeal(null)}
              onCustomise={(meal) => {
                setDetailMeal(null);
                setCustomiseMeal(meal);
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {customiseMeal && (
            <CustomiseScreen
              meal={customiseMeal}
              onBack={() => setCustomiseMeal(null)}
              onConfirm={advanceToNextDay}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
