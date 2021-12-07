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

const RazorPayPaymentOptions = (paymetOption) => {
  console.log(paymetOption, "paymetn-->");
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY_ID,
    amount: paymetOption.amount,
    currency: paymetOption.currency,
    name: paymetOption.productName,
    description: paymetOption.description,
    prefill: paymetOption.prefill,
    order_id: paymetOption.order_id,
    image:
      "https://novel-suites-ui.vercel.app/static/media/logo_novel.78ee88e9.gif",
    handler: async (response) => new Promise((resolve) => resolve(response)),
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature);
  };
  return options;
};

module.exports = {
  loadRazorPayScript,
  RazorPayPaymentOptions,
};
