const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to MongoDb.."))
  .catch((err) => console.error("Could not connect to mongodb...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  try {
    const result = await course.validate();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const courses = await Course.find({ author: "Mosh", isPubliushed: true })
    .limit(10)
    .sort({ name: 1 });
  console.log(courses);
}

createCourse();
