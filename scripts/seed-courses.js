const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define MONGODB_URI in .env.local");
    process.exit(1);
}

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    level: String,
    price: Number,
    duration: Number,
    imageUrl: String,
    instructorName: String,
    status: String,
    isPublished: Boolean,
});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);

const courses = [
    {
        title: "Full-Stack Web Development Bootcamp",
        description: "Master the MERN stack (MongoDB, Express, React, Node.js) and build modern, scalable web applications from scratch. This comprehensive bootcamp covers everything from HTML/CSS basics to advanced backend architecture.",
        category: "Development",
        level: "Beginner",
        price: 4999,
        duration: 48,
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        instructorName: "Sarah Johnson",
        status: "Published",
        isPublished: true
    },
    {
        title: "Modern React with Next.js 14",
        description: "Deep dive into the React ecosystem with Next.js 14. Learn App Router, Server Components, Server Actions, and authentication. Build production-ready applications with SEO optimization.",
        category: "Development",
        level: "Intermediate",
        price: 3499,
        duration: 24,
        imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
        instructorName: "Michael Chen",
        status: "Published",
        isPublished: true
    },
    {
        title: "Python for Data Science and AI",
        description: "Learn Python programming and apply it to Data Science and Machine Learning. Master libraries like Pandas, NumPy, Matplotlib, and Scikit-learn. Build real-world AI models.",
        category: "Data Science",
        level: "Beginner",
        price: 3999,
        duration: 36,
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        instructorName: "David Smith",
        status: "Published",
        isPublished: true
    },
    {
        title: "AWS Certified Solutions Architect",
        description: "Prepare for the AWS Solutions Architect Associate exam. Learn EC2, S3, RDS, Lambda, and cloud architecture best practices. Hands-on labs included.",
        category: "Development",
        level: "Advanced",
        price: 5999,
        duration: 40,
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        instructorName: "Emily White",
        status: "Published",
        isPublished: true
    },
    {
        title: "DevOps Masterclass: Docker & K8s",
        description: "Master the art of deployment and orchestration. Learn Docker, Kubernetes, Jenkins, CI/CD pipelines, and Terraform. Automate your infrastructure like a pro.",
        category: "Development",
        level: "Advanced",
        price: 5499,
        duration: 32,
        imageUrl: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?q=80&w=2070&auto=format&fit=crop",
        instructorName: "James Wilson",
        status: "Published",
        isPublished: true
    },
    {
        title: "The Complete Cybersecurity Bootcamp",
        description: "Become a cybersecurity expert. Learn ethical hacking, network security, penetration testing, and digital forensics. Protect systems from modern threats.",
        category: "Security",
        level: "Beginner",
        price: 4499,
        duration: 50,
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        instructorName: "Alex Brown",
        status: "Published",
        isPublished: true
    },
    {
        title: "Mobile App Development with Flutter",
        description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Google's Flutter framework and Dart programming language.",
        category: "Development",
        level: "Intermediate",
        price: 2999,
        duration: 28,
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b5bbb695?q=80&w=2070&auto=format&fit=crop",
        instructorName: "Lisa Taylor",
        status: "Published",
        isPublished: true
    }
];

async function seedCourses() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...");

        // Optional: clear existing courses
        // await Course.deleteMany({});
        // console.log("Cleared existing courses...");

        const result = await Course.insertMany(courses);
        console.log(`\n✅ Successfully added ${result.length} courses!`);

        result.forEach(course => {
            console.log(`- ${course.title} ($${course.price})`);
        });

    } catch (error) {
        console.error("Error seeding courses:", error);
    } finally {
        await mongoose.disconnect();
    }
}

seedCourses();
