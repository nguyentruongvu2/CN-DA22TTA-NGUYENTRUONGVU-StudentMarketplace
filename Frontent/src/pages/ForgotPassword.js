import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdEmail, MdLock, MdCheckCircle, MdInfo } from "react-icons/md";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    console.log("🔄 Đang gửi request forgot password...");
    console.log("📬 Email:", email);
    console.log("🔗 API URL:", `${API_URL}/auth/forgot-password`);

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });

      console.log("✅ Response nhận được:", response);
      console.log("📊 Status:", response.status);
      console.log("📋 Data:", response.data);

      if (response.data.thành_công) {
        setEmailSent(true);
        toast.success(
          "Email đặt lại mật khẩu đã được gửi! Kiểm tra cả hộp thư spam."
        );
      } else {
        toast.error(response.data.tin_nhan || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("❌ Lỗi:", error);
      console.error("📊 Status:", error.response?.status);
      console.error("📋 Response data:", error.response?.data);
      console.error("💥 Error message:", error.message);
      toast.error(
        error.response?.data?.tin_nhan || "Không thể gửi email đặt lại mật khẩu"
      );
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
              <MdCheckCircle className="text-6xl text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Email đã được gửi!
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email{" "}
              <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Vui lòng kiểm tra hộp thư đến (và cả thư rác) của bạn.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition"
            >
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <MdLock className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Quên mật khẩu?
          </h1>
          <p className="text-gray-600">
            Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MdEmail className="text-blue-600" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm hover:underline"
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-2 border-blue-300 rounded-xl p-4">
          <p className="text-sm text-blue-800 flex items-start gap-2">
            <MdInfo className="text-blue-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Lưu ý:</strong> Link đặt lại mật khẩu chỉ có hiệu lực
              trong 1 giờ.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
