import Image from "next/image";
// import { FaTwitter } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa6";

export default function Footer() {
    return (
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Column 1 */}
          <div>
            <h3 className="text-sm font-bold mb-4">Get Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/get-help">Order Status</a></li>
              <li><a href="/get-help">Shipping and Delivery</a></li>
              <li><a href="/get-help">Returns</a></li>
              <li><a href="/get-help">Payment Options</a></li>
              <li><a href="/get-help">Contact Us</a></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-sm font-bold mb-4">About Nike</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/">News</a></li>
              <li><a href="/">Careers</a></li>
              <li><a href="/">Sustainability</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-sm font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/">Gift Cards</a></li>
              <li><a href="/">Find a Store</a></li>
              <li><a href="/">Nike Journal</a></li>
              <li><a href="/">Nike Membership</a></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-sm font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Image width={200} height={200} src="/icons/facebook.svg" alt="Facebook" className="h-6" />
              </a>
              <a href="#" aria-label="Twitter">
                <Image width={200} height={200} src="/icons/twitter" alt="Twitter" className="h-6" />
              </a>
              <a href="#" aria-label="Instagram">
                <Image width={200} height={200} src="/icons/instagram.svg" alt="Instagram" className="h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>© 2024 Nike, Inc. All Rights Reserved</p>
          <p>
            Terms of Use | Privacy Policy | CA Supply Chains Act | Cookie Settings
          </p>
        </div>
      </footer>
    );
  }
  