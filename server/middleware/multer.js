import multer from "multer";

// Store uploaded files in memory (RAM), not disk
const upload = multer({ storage: multer.memoryStorage() });

export default upload;
