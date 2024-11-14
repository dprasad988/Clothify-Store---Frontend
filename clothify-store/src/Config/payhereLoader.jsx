export const loadPayHere = () => {
  return new Promise((resolve, reject) => {
    if (window.payhere) {
      console.log("PayHere already loaded");
      resolve(window.payhere);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";  // PayHere SDK URL
    script.onload = () => {
      console.log("PayHere script loaded successfully");
      resolve(window.payhere);
    };
    script.onerror = (error) => {
      console.error("Failed to load PayHere SDK", error);
      reject(new Error("Failed to load PayHere SDK"));
    };
    document.body.appendChild(script);  // Add the script to the document
  });
};
