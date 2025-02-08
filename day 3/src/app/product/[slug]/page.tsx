import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

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
                <div className="aspect-square">
                    {product.image && (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.productName}
                            width={500}
                            height={500}
                            className="rounded-lg shadow-md "
                        />
                    )}
                </div>
                {/* Product Details */}
                <div className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">{product.productName}</h1>
                    <p className="text-lg text-gray-600">{product.description}</p>
                    <p className="text-2xl font-semibold text-black">
                        MRP: ₹{product.price}
                    </p>
                    <button className="bg-blue-700 text-white border border-gray-300 px-2 py-2 w-32 rounded-md hover:bg-blue-500 transition text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
