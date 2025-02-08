import React from "react";
import Navbar from "../components/Navbar"; // Adjust the path if necessary
import { ImMobile } from "react-icons/im";
import { LuMessageSquareMore } from "react-icons/lu";
import { BsEnvelopeFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";

const GetHelp = () => {
  return (
    <div style={{ backgroundColor: "white", color: "black", fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Header */}
        <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "40px", fontWeight: "bold" }}>
          GET HELP
        </h1>

        {/* Content Section */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
          {/* Left Section */}
          <div style={{ flex: 2 }}>
            <h2 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: "bold" }}>
              What payment options can I use on Nike orders?
            </h2>
            <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
              We want to make buying your favorite Nike shoes and gear online fast and easy, and we accept the following payment options:
            </p>
            <ul style={{ marginBottom: "20px" }}>
              <li>Visa, Mastercard, Diners Club, Discover, American Express, Visa Electron, Maestro</li>
              <li>Apple Pay</li>
            </ul>
            <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
              Nike Members can store multiple debit or credit cards in their profile for faster checkout. If youre not already a Member,{" "}
              <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>join us today</a>.
            </p>
            <div style={{ marginBottom: "30px" }}>
              <button style={{ backgroundColor: "#fff", color: "#000", padding: "10px 20px", marginRight: "10px", border: "none", borderRadius: "5px" }}>
                Join Us
              </button>
              <button style={{ backgroundColor: "black", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>
                Shop Nike
              </button>
            </div>

            <h2 style={{ fontSize: "20px", marginBottom: "20px", fontWeight: "bold" }}>FAQs</h2>
            <div>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Does my card need international purchases enabled?</p>
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
                Yes, we recommend asking your bank to enable international purchases on your card...
              </p>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Can I pay for my order with multiple methods?</p>
              <p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
                No, payment for Nike orders cannot be split between multiple payment methods.
              </p>
            </div>
          </div>

          {/* Right Section - Contact Us */}
          <div style={{ flex: 1, backgroundColor: "white", color:"black" , padding: "20px", borderRadius: "8px" }}>
            <h2 style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>Contact Us</h2>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <ImMobile style={{ fontSize: "24px", marginRight: "15px" }} />
              <div>
                <p style={{ margin: 0 }}>000 800 919 0566</p>
                <p style={{ fontSize: "14px", color: "#111" }}>Products & Orders: 24/7</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <LuMessageSquareMore style={{ fontSize: "24px", marginRight: "15px" }} />
              <div>
                <p style={{ margin: 0 }}>Company Info & Enquiries</p>
                <p style={{ fontSize: "14px", color: "#111" }}>07:30 - 16:30, Mon - Fri</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <BsEnvelopeFill style={{ fontSize: "24px", marginRight: "15px" }} />
              <p style={{ margin: 0 }}>We’ll reply within five business days</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <FaLocationDot style={{ fontSize: "24px", marginRight: "15px" }} />
              <p style={{ margin: 0 }}>Find Nike retail stores near you</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "black", color:"white" , padding: "40px 20px", marginTop: "40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
          <div>
            <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Find a Store</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.6" }}>
              <li>Become a Member</li>
              <li>Sign Up for Email</li>
              <li>Send Us Feedback</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>Get Help</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.6" }}>
              <li>Order Status</li>
              <li>Delivery</li>
              <li>Payment Options</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: "16px", marginBottom: "10px" }}>About Nike</h4>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.6" }}>
              <li>News</li>
              <li>Careers</li>
              <li>Investors</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GetHelp;
