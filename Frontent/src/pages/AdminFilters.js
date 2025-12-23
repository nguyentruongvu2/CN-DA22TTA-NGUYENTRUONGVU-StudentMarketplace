import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const AdminFilters = () => {
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFilter, setEditingFilter] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "select",
    group: "general",
    inputType: "select",
    values: [],
    priceRange: {
      min: 0,
      max: 10000000,
      step: 100000,
    },
    isActive: true,
    order: 0,
    applicableCategories: [],
    applicablePostTypes: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [filtersRes, categoriesRes, postTypesRes] = await Promise.all([
        api.get("/filters"),
        api.get("/categories"),
        api.get("/post-types"),
      ]);
      setFilters(filtersRes.data.filters || []);
      setCategories(categoriesRes.data.categories || []);
      setPostTypes(postTypesRes.data.postTypes || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Không thể tải dữ liệu");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("priceRange.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        priceRange: {
          ...formData.priceRange,
          [key]: parseInt(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleValuesChange = (index, field, value) => {
    const newValues = [...formData.values];
    newValues[index][field] = value;
    setFormData({ ...formData, values: newValues });
  };

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { label: "", value: "", icon: "" }],
    });
  };

  const removeValue = (index) => {
    const newValues = formData.values.filter((_, i) => i !== index);
    setFormData({ ...formData, values: newValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFilter) {
        await api.put(`/filters/${editingFilter._id}`, formData);
        toast.success("Cập nhật bộ lọc thành công");
      } else {
        await api.post("/filters", formData);
        toast.success("Tạo bộ lọc mới thành công");
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving filter:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const handleEdit = (filter) => {
    setEditingFilter(filter);
    setFormData({
      name: filter.name,
      type: filter.type,
      group: filter.group,
      inputType: filter.inputType,
      values: filter.values || [],
      priceRange: filter.priceRange || { min: 0, max: 10000000, step: 100000 },
      isActive: filter.isActive,
      order: filter.order,
      applicableCategories: filter.applicableCategories || [],
      applicablePostTypes: filter.applicablePostTypes || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bộ lọc này?")) {
      try {
        await api.delete(`/filters/${id}`);
        toast.success("Xóa bộ lọc thành công");
        fetchData();
      } catch (error) {
        console.error("Error deleting filter:", error);
        toast.error("Không thể xóa bộ lọc");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFilter(null);
    setFormData({
      name: "",
      type: "select",
      group: "general",
      inputType: "select",
      values: [],
      priceRange: {
        min: 0,
        max: 10000000,
        step: 100000,
      },
      isActive: true,
      order: 0,
      applicableCategories: [],
      applicablePostTypes: [],
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Đang tải...</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Bộ Lọc</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Thêm Bộ Lọc
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nhóm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Input Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filters.map((filter) => (
              <tr key={filter._id}>
                <td className="px-6 py-4 whitespace-nowrap">{filter.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {filter.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {filter.group}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {filter.inputType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      filter.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {filter.isActive ? "Hoạt động" : "Ẩn"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEdit(filter)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(filter._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] overflow-y-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
            <h2 className="text-xl font-bold mb-4">
              {editingFilter ? "Sửa Bộ Lọc" : "Thêm Bộ Lọc Mới"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Tên bộ lọc
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Loại
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    >
                      <option value="price_range">Khoảng giá</option>
                      <option value="condition">Tình trạng</option>
                      <option value="location">Địa điểm</option>
                      <option value="university">Trường</option>
                      <option value="custom">Tùy chỉnh</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nhóm
                    </label>
                    <input
                      type="text"
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kiểu Input
                    </label>
                    <select
                      name="inputType"
                      value={formData.inputType}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="range">Range</option>
                      <option value="radio">Radio</option>
                    </select>
                  </div>
                </div>

                {formData.type === "price_range" && (
                  <div className="border p-4 rounded">
                    <h3 className="font-medium mb-2">Cấu hình khoảng giá</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm mb-1">Min</label>
                        <input
                          type="number"
                          name="priceRange.min"
                          value={formData.priceRange.min}
                          onChange={handleInputChange}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Max</label>
                        <input
                          type="number"
                          name="priceRange.max"
                          value={formData.priceRange.max}
                          onChange={handleInputChange}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Step</label>
                        <input
                          type="number"
                          name="priceRange.step"
                          value={formData.priceRange.step}
                          onChange={handleInputChange}
                          className="w-full border rounded px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="border p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Giá trị bộ lọc</h3>
                    <button
                      type="button"
                      onClick={addValue}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      + Thêm giá trị
                    </button>
                  </div>
                  {formData.values.map((value, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Label"
                        value={value.label}
                        onChange={(e) =>
                          handleValuesChange(index, "label", e.target.value)
                        }
                        className="flex-1 border rounded px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={value.value}
                        onChange={(e) =>
                          handleValuesChange(index, "value", e.target.value)
                        }
                        className="flex-1 border rounded px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Icon"
                        value={value.icon}
                        onChange={(e) =>
                          handleValuesChange(index, "icon", e.target.value)
                        }
                        className="w-20 border rounded px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeValue(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Thứ tự
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium">Hoạt động</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  {editingFilter ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFilters;
