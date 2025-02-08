import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToCartButton from './AddToCartButton';

interface ProductPageProps {
    params: { slug: string };
}

async function getProduct(slug: string): Promise<Product> {
    return client.fetch(
        groq`*[_type == "product" && slug.current == $slug][0]{
            _id,
            productName,
            description,
            _type,
            image,
            price
        }`,
        { slug }
    );
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = params;
    const product = await getProduct(slug);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="relative">
                    {product.image && (
                      <Image
                      src={urlFor(product.image).url()}
                      alt={product.productName}
                      width={500}
                      height={400}
                      className="rounded-lg"
                  />
                    )}
                </div>
                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight mb-2">
                        {product.productName}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            In Stock
                        </div>
                        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                        <span className="text-gray-500">SKU: {product._id.slice(-6)}</span>
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-gray-200 pl-4 mb-6">
                        {product.description}
                    </p>
                    <div className="flex flex-col gap-2 bg-gray-50 p-6 rounded-xl shadow-sm">
                        <div className="flex items-baseline gap-2">
                            <span className="text-sm text-gray-500 line-through">
                                ₹{Math.round(product.price * 1.1).toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm text-green-600 font-medium">
                                10% off
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-3xl font-bold text-gray-900">
                                ₹{product.price.toLocaleString('en-IN')}
                            </p>
                            <span className="text-sm text-gray-500">
                                Inclusive of all taxes
                            </span>
                        </div>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>

            {/* Professional Footer */}
            <footer className="mt-24 border-t border-gray-200">
                <div className="max-w-7xl mx-auto py-12 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
                            <p className="text-gray-600 text-sm">We are committed to providing the best athletic wear and shoes for our customers.</p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Customer Service</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>Contact Us</li>
                                <li>Shipping Policy</li>
                                <li>Returns & Exchanges</li>
                                <li>FAQs</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>New Arrivals</li>
                                <li>Best Sellers</li>
                                <li>Sale Items</li>
                                <li>Gift Cards</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Facebook</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Instagram</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>
                            <p className="text-sm text-gray-600">Subscribe to our newsletter for updates and exclusive offers!</p>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-600">&copy; 2024 Your Company. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
