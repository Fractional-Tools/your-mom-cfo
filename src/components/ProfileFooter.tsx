import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";

export default function ProfileFooter() {
  return (
    <Link
      to="/"
      className="fixed bottom-7 right-6 z-50 flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
    >
      <span className="opacity-0 group-hover:opacity-100 transition-opacity font-body">
        Alex Reyes
      </span>
      <img
        src={profilePhoto}
        alt="Profile"
        className="w-7 h-7 rounded-full object-cover ring-2 ring-border group-hover:ring-foreground/20 transition-all"
      />
    </Link>
  );
}
