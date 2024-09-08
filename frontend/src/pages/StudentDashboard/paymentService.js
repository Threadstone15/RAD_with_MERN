import axios from "axios";

export const fetchHash = async (order_id, amount, currency) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/generate-hash",
      {
        order_id,
        amount,
        currency,
      }
    );
    console.log("Hash received:", response.data.hash); // Log the hash
    return response.data.hash;
  } catch (error) {
    console.error(
      "Error fetching hash:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to initiate the PayHere payment
export const startPayment = async (course, student, hash) => {
  console.log("Payment initiated with course:", course);
  console.log("Payment initiated with student:", student);
  console.log("Payment initiated with hash:", hash);

  const payment = {
    sandbox: true,
    merchant_id: "1227926",
    return_url: "http://localhost:5000/return",
    cancel_url: "http://localhost:5000/cancel",
    notify_url: "https://localhost:5000/api/payhere/notify",
    order_id: `Order${course._id}`,
    items: course.className,
    amount: course.fee,
    currency: "LKR",
    hash: hash,
    first_name: student.name.split(" ")[0],
    last_name: student.name.split(" ")[1] || "",
    email: student.email,
    phone: student.phone,
    address: student.address,
    city: student.city || "N/A",
    country: student.country || "N/A",
  };

  try {
    if (window.payhere) {
      console.log("Starting payment");

      // Listen for the payment completion event
      window.payhere.onCompleted = async function onCompleted(orderId) {
        console.log(`Payment completed successfully for order ID: ${orderId}`);

        // Prepare the data to send to the backend
        const paymentData = {
          studentID: student.id,
          classID: course._id,
          amount: course.fee,
          date: new Date().toISOString(),
          month: new Date().getMonth() + 1,
        };

        console.log("Sending payment notification to backend:", paymentData);

        try {
          const response = await fetch("http://localhost:5000/api/notify_app", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          if (response.ok) {
            console.log("Payment notification sent to backend successfully");
          } else {
            console.error("Failed to send payment notification to backend");
            console.error("Response status:", response.status);
            console.error("Response body:", await response.text());
          }
        } catch (error) {
          console.error(
            "Error sending payment notification to backend:",
            error
          );
        }
      };

      // Listen for the payment dismissed event
      window.payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed by user.");
      };

      // Listen for errors
      window.payhere.onError = function onError(error) {
        console.error("Payment error occurred:", error);
      };

      window.payhere.startPayment(payment);
    } else {
      console.error("PayHere script not loaded");
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
};
