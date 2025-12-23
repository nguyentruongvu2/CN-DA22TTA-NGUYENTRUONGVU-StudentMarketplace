const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
  {
    // Tên bộ lọc
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    // Loại bộ lọc
    type: {
      type: String,
      required: true,
      enum: ["price_range", "condition", "location", "university", "custom"],
    },

    // Nhóm (để nhóm các filter liên quan)
    group: {
      type: String,
      default: "general",
    },

    // Giá trị bộ lọc (cho dropdown, checkbox)
    values: [
      {
        label: String,
        value: String,
        icon: String,
      },
    ],

    // Cấu hình cho price_range
    priceRange: {
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 10000000,
      },
      step: {
        type: Number,
        default: 100000,
      },
    },

    // Kiểu input
    inputType: {
      type: String,
      enum: ["select", "checkbox", "range", "radio"],
      default: "select",
    },

    // Trạng thái
    isActive: {
      type: Boolean,
      default: true,
    },

    // Thứ tự hiển thị
    order: {
      type: Number,
      default: 0,
    },

    // Áp dụng cho danh mục nào
    applicableCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    // Áp dụng cho loại bài đăng nào
    applicablePostTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostType",
      },
    ],

    // Người tạo
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "BO_LOC" }
);

// Index
filterSchema.index({ type: 1, isActive: 1 });
filterSchema.index({ group: 1, order: 1 });

module.exports = mongoose.model("Filter", filterSchema);
