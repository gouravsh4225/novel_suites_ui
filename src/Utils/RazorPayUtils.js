const loadRazorPayScript = () => {
  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(scriptTag);
    scriptTag.onload = () => {
      resolve(true);
    };
    scriptTag.onerror = () => {
      resolve(false);
    };
  });
};

const RazorPayPaymentOptions = (
  amount,
  currency,
  productName,
  productDesc,
  orderId
) => {
  const options = {
    key: process.env.razorPayKeyId,
    amount,
    currency,
    name: productName,
    description: productDesc,
    image:
      "https://novel-suites-ui.vercel.app/static/media/logo_novel.78ee88e9.gif",
    order_id: orderId,
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "",
      email: "",
      contact: "",
    },
  };
  return options;
};

module.exports = {
  loadRazorPayScript,
  RazorPayPaymentOptions,
};
