const Filter = require("../models/Filter");
// audit logging removed

// Lấy tất cả bộ lọc
exports.getAllFilters = async (req, res) => {
  try {
    const filters = await Filter.find()
      .populate("createdBy", "fullName email")
      .populate("applicableCategories", "name slug")
      .populate("applicablePostTypes", "name code")
      .sort({ group: 1, order: 1, createdAt: -1 });

    res.status(200).json({
      thành_công: true,
      filters,
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi lấy danh sách bộ lọc",
    });
  }
};

// Lấy bộ lọc theo ID
exports.getFilterById = async (req, res) => {
  try {
    const filter = await Filter.findById(req.params.id)
      .populate("createdBy", "fullName email")
      .populate("applicableCategories", "name slug")
      .populate("applicablePostTypes", "name code");

    if (!filter) {
      return res.status(404).json({
        thành_công: false,
        tin_nhắn: "Không tìm thấy bộ lọc",
      });
    }

    res.status(200).json({
      thành_công: true,
      filter,
    });
  } catch (error) {
    console.error("Error fetching filter:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi lấy thông tin bộ lọc",
    });
  }
};

// Tạo bộ lọc mới
exports.createFilter = async (req, res) => {
  try {
    const {
      name,
      type,
      group,
      values,
      priceRange,
      inputType,
      isActive,
      order,
      applicableCategories,
      applicablePostTypes,
    } = req.body;

    const filter = new Filter({
      name,
      type,
      group: group || "general",
      values: values || [],
      priceRange: priceRange || { min: 0, max: 10000000, step: 100000 },
      inputType: inputType || "select",
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
      applicableCategories: applicableCategories || [],
      applicablePostTypes: applicablePostTypes || [],
      createdBy: req.user.id,
    });

    await filter.save();

    res.status(201).json({
      thành_công: true,
      tin_nhắn: "Tạo bộ lọc thành công",
      filter,
    });
  } catch (error) {
    console.error("Error creating filter:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi tạo bộ lọc",
    });
  }
};

// Cập nhật bộ lọc
exports.updateFilter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      group,
      values,
      priceRange,
      inputType,
      isActive,
      order,
      applicableCategories,
      applicablePostTypes,
    } = req.body;

    const filter = await Filter.findById(id);
    if (!filter) {
      return res.status(404).json({
        thành_công: false,
        tin_nhắn: "Không tìm thấy bộ lọc",
      });
    }

    // Cập nhật
    if (name) filter.name = name;
    if (type) filter.type = type;
    if (group) filter.group = group;
    if (values) filter.values = values;
    if (priceRange) filter.priceRange = priceRange;
    if (inputType) filter.inputType = inputType;
    if (isActive !== undefined) filter.isActive = isActive;
    if (order !== undefined) filter.order = order;
    if (applicableCategories)
      filter.applicableCategories = applicableCategories;
    if (applicablePostTypes) filter.applicablePostTypes = applicablePostTypes;
    filter.updatedAt = Date.now();

    await filter.save();

    res.status(200).json({
      thành_công: true,
      tin_nhắn: "Cập nhật bộ lọc thành công",
      filter,
    });
  } catch (error) {
    console.error("Error updating filter:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi cập nhật bộ lọc",
    });
  }
};

// Xóa bộ lọc
exports.deleteFilter = async (req, res) => {
  try {
    const { id } = req.params;

    const filter = await Filter.findById(id);
    if (!filter) {
      return res.status(404).json({
        thành_công: false,
        tin_nhắn: "Không tìm thấy bộ lọc",
      });
    }

    await Filter.findByIdAndDelete(id);

    res.status(200).json({
      thành_công: true,
      tin_nhắn: "Xóa bộ lọc thành công",
    });
  } catch (error) {
    console.error("Error deleting filter:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi xóa bộ lọc",
    });
  }
};

// Lấy bộ lọc active
exports.getActiveFilters = async (req, res) => {
  try {
    const filters = await Filter.find({ isActive: true })
      .populate("applicableCategories", "name slug")
      .populate("applicablePostTypes", "name code")
      .sort({ group: 1, order: 1 });

    res.status(200).json({
      thành_công: true,
      filters,
    });
  } catch (error) {
    console.error("Error fetching active filters:", error);
    res.status(500).json({
      thành_công: false,
      tin_nhắn: "Lỗi khi lấy danh sách bộ lọc",
    });
  }
};
