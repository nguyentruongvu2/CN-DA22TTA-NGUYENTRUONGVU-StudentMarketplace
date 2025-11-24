// Script để cập nhật lại commentCount cho tất cả bài đăng
require("dotenv").config();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const fixCommentCount = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Đã kết nối MongoDB");

    // Lấy tất cả bài đăng
    const posts = await Post.find({});
    console.log(`📊 Tìm thấy ${posts.length} bài đăng`);

    let updated = 0;

    // Đếm lại số bình luận (bao gồm cả reply) cho mỗi bài
    for (const post of posts) {
      // Đếm tất cả comment (cả gốc và reply)
      const commentCount = await Comment.countDocuments({
        postId: post._id,
      });

      // Cập nhật nếu khác
      if (post.commentCount !== commentCount) {
        post.commentCount = commentCount;
        await post.save();
        console.log(
          `📝 Updated post ${post._id}: ${post.title.substring(
            0,
            30
          )}... - Comments: ${commentCount}`
        );
        updated++;
      }
    }

    console.log(
      `\n✅ Hoàn thành! Đã cập nhật ${updated}/${posts.length} bài đăng`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  }
};

fixCommentCount();
