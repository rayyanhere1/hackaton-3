"use client"; // Client Component for interactivity

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
   // Use Cart Context for adding items

  // Array of products (reuse from ProductsPage or fetch from API/database)
  
  const products = [
    {
        id: 1,
        name: "Nike Air Force 1 Mid '07",
        description: "Iconic basketball-inspired silhouette with a mid-top design. Soft leather upper provides durability and support. Comfortable cushioning for all-day wear.",
        color: "1 Colour",
        price: "₹10 795.00",
        image: "/images/1.jpg",
        label: "Just In",
      },
      {
        id: 2,
        name: "Nike Court Vision Low Next Nature",
        description: "Stylish and modern low-top design with a retro vibe. Sustainable materials used for reduced environmental impact. Comfortable and versatile for everyday wear.",
        color: "1 Colour",
        price: "₹4 995.00",
        image: "/images/2.jpg",
        label: "Just In",
      },
      {
        id: 3,
        name: "Nike Air Force 1 PLT.AF.ORM",
        description: "Women’s updated version of the classic Air Force 1. Features a platform sole for a bold look and added height. Soft leather upper for comfort and support.",
        color: "1 Colour",
        price: "₹8 695.00",
        image: "/images/3.jpg",
        label: "Just In",
      },
      {
        id: 4,
        name: "Nike Air Force 1 React",
        description: "A perfect blend of iconic design and advanced cushioning. React foam technology enhances comfort for all-day wear. Lightweight and durable construction.",
        color: "1 Colour",
        price: "₹13 295.00",
        image: "/images/4.jpg",
        label: "Just In",
      },
      {
        id: 5,
        name: "Air Jordan 1 Elevate Low",
        description: "A twist on the legendary Jordan 1 with a low-cut design and elevated midsole. Stylish and comfortable for all-day use. Premium leather and suede upper.",
        color: "1 Colour",
        price: "₹21 995.00",
        image: "/images/5.jpg",
        label: "Promo Exclusion",
      },
      {
        id: 6,
        name: "Nike Standard Issue",
        description: "Womens basketball jersey with a sleek, modern fit. Made with breathable fabric for performance. Features bold Nike branding and a durable design.",
        color: "1 Colour",
        price: "₹2 999.00",
        image: "/images/6.jpg",
        label: "Just In",
      },
      {
        id: 7,
        name: "Nike Dunk Low Retro SE",
        description: "Retro-inspired design with premium leather and suede materials. Durable rubber outsole provides excellent traction. Perfect for casual wear and sports.",
        color: "1 Colour",
        price: "₹9 999.00",
        image: "/images/7.jpg",
        label: "Promo Exclusion",
      },
      {
        id: 8,
        name: "Nike Dri-FIT UV Hyverse",
        description: "Lightweight and breathable men's short-sleeve fitness top. Made with Dri-FIT technology to wick away sweat. Ideal for active use and outdoor workouts.",
        color: "1 Colour",
        price: "₹2 499.00",
        image: "/images/8.jpg",
        label: "Sustainable Materials",
      },
      {
        id: 9,
        name: "Nike Court Vision Low",
        description: "Inspired by retro basketball styles, this low-top sneaker offers a sleek design. Features a mix of leather and synthetic materials for durability. Perfect for casual wear.",
        color: "1 Colour",
        price: "₹5 699.00",
        image: "/images/9.jpg",
        label: "Just In",
      },
      {
        id: 10,
        name: "Nike Dri-FIT Ready",
        description: "Men’s short-sleeve fitness top designed for breathability. Dri-FIT technology keeps you cool and dry during intense workouts. Soft, comfortable, and durable.",
        color: "3 Colours",
        price: "₹2 495.00",
        image: "/images/10.jpg",
        label: "Just In",
      },
      {
        id: 11,
        name: "Nike Air Force 1 LVB 3",
        description: "The perfect blend of style and comfort with a classic Air Force 1 design. Features a cushioned midsole for support and comfort. Suitable for everyday wear.",
        color: "1 Colour",
        price: "₹7 995.00",
        image: "/images/11.jpg",
        label: "Just In",
      },
      {
        id: 12,
        name: "Nike Blazer Low Platform",
        description: "Classic Blazer design reimagined with a platform sole. Premium leather upper for durability and support. Ideal for casual styling and everyday wear.",
        color: "3 Colours",
        price: "₹7,499.00",
        image: "/images/12.jpg",
        label: "Just In",
      },
      {
        id: 13,
        name: "Nike Air Force 1'07",
        description: "A modern take on the classic Air Force 1. Soft leather upper and foam midsole provide ultimate comfort. A versatile and timeless sneaker for any occasion.",
        color: "1 Colour",
        price: "₹8 999.00",
        image: "/images/13.jpg",
        label: "Just In",
      },
      {
        id: 14,
        name: "Nike Pro Dri-FIT",
        description: "Men’s tight-fit sleeveless top perfect for athletic performance. Made with breathable fabric that wicks away moisture. Ideal for intense training and workouts.",
        color: "1 Colour",
        price: "₹1 695.00",
        image: "/images/14.jpg",
        label: "Just In",
      },
      {
        id: 15,
        name: "Nike Dunk Retro",
        description: "A reissue of the iconic Dunk design, featuring a premium leather upper. The durable rubber outsole offers excellent grip and comfort. Great for both sports and casual wear.",
        color: "1 Colour",
        price: "₹8 999.00",
        image: "/images/15.jpg",
        label: "Just In",
      },
      {
        id: 16,
        name: "Nike Air Max SC",
        description: "Sleek and stylish sneakers with a responsive Air Max sole. Soft mesh upper and synthetic overlays provide breathability and durability. Perfect for daily wear.",
        color: "2 Colours",
        price: "₹5 299.00",
        image: "/images/16.jpg",
        label: "Just In",
      },
      {
        id: 17,
        name: "Nike Dri-FIT UV Miller",
        description: "Men’s short-sleeve running top that provides superior comfort and breathability. Dri-FIT technology wicks away sweat. Ideal for warm-weather workouts.",
        color: "1 Colour",
        price: "₹1 499.00",
        image: "/images/17.jpg",
        label: "Just In",
      },
      {
        id: 18,
        name: "Nike Air Max SYSTM",
        description: "Stylish sneakers designed for kids with a lightweight and supportive structure. Soft mesh upper ensures breathability. Ideal for active play and everyday use.",
        color: "1 Colour",
        price: "₹6 499.00",
        image: "/images/18.jpg",
        label: "Just In",
      },
      {
        id: 19,
        name: "Nike Air Max SYSTM",
        description: "A sleek and comfortable sneaker for older kids. The Air Max cushioning system offers superior comfort. A great choice for both casual wear and sports activities.",
        color: "1 Colour",
        price: "₹6 995.00",
        image: "/images/19.jpg",
        label: "Just In",
      },
      {
        id: 20,
        name: "Nike SB Zoom Jakosi OG+",
        description: "Skateboarding shoes with Zoom Air cushioning for comfort. Durable suede and leather upper for long-lasting wear. Designed for a snug fit and enhanced grip.",
        color: "1 Colour",
        price: "₹8 499.00",
        image: "/images/20.jpg",
        label: "Just In",
      },
      {
        id: 21,
        name: "Nike Dri-FIT Run Division Rise 365",
        description: "Men’s running tank designed for ultimate performance. Dri-FIT technology keeps you dry and cool. Lightweight and breathable for maximum comfort during runs.",
        color: "2 Colours",
        price: "₹3 999.00",
        image: "/images/21.jpg",
        label: "Just In",
      },
      {
        id: 22,
        name: "Nike Dri-FIT Challenger",
        description: "Men’s shorts designed for athletic performance. Made with Dri-FIT fabric to wick moisture away from the skin. Comfortable and flexible for all types of workouts.",
        color: "1 Colour",
        price: "₹2 299.00",
        image: "/images/22.jpg",
        label: "Just In",
      },
      {
        id: 23,
        name: "Jordan Series ES",
        description: "Men’s casual shorts with a relaxed fit. Made with breathable cotton fabric for comfort. Features the iconic Jordan branding for a sporty style.",
        color: "2 Colours",
        price: "₹7 499.00",
        image: "/images/27.jpg",
        label: "Just In",
      },
      {
        id: 24,
        name: "Nike Outdoor Play",
        description: "Kid’s oversized woven jacket designed for comfort and style. Durable fabric and loose fit provide freedom of movement. Ideal for outdoor play and casual outings.",
        color: "1 Colour",
        price: "₹3 295.00",
        image: "/images/23.jpg",
        label: "Just In",
      },
      {
        id: 25,
        name: "Nike Sportswear Trend",
        description: "Girls’ woven shorts designed with comfort and style in mind. Lightweight fabric and soft texture make them ideal for warm weather. Versatile and trendy.",
        color: "2 Colours",
        price: "₹2 499.00",
        image: "/images/24.jpg",
        label: "Just In",
      },
      {
        id: 26,
        name: "Nike Blazer Low '77 Jumbo",
        description: "The '77 Blazer features a jumbo design with bold proportions. The leather upper provides durability while the cushioned sole ensures comfort. Classic design with a modern twist.",
        color: "1 Colour",
        price: "₹8 499.00",
        image: "/images/25.jpg",
        label: "Just In",
      },
      {
        id: 27,
        name: "Nike SB Force 58",
        description: "Skate shoes built for performance with reinforced suede and rubber. Features Zoom Air cushioning for responsive comfort. Perfect for skateboarding or casual wear.",
        color: "1 Colour",
        price: "₹5 999.00",
        image: "/images/26.jpg",
        label: "Just In",
      }
  
    // Add all other product objects as per your initial data...
  ];
  // Find the product by ID from the product list
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="text-center text-red-600">
        <h1>Product Not Found</h1>
        <button onClick={() => router.back()} className="text-blue-500 mt-4">
          Go Back
        </button>
      </div>
    );
  }

  
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Product Details */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-1">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-green-700 font-semibold mt-1">MRP: {product.price}</p>

            <button
             
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;