import avatar1 from "@/assets/avatars/avatar-1.jpg";
import avatar2 from "@/assets/avatars/avatar-2.jpg";
import avatar3 from "@/assets/avatars/avatar-3.jpg";
import avatar4 from "@/assets/avatars/avatar-4.jpg";
import avatar5 from "@/assets/avatars/avatar-5.jpg";
import avatar6 from "@/assets/avatars/avatar-6.jpg";
import avatar7 from "@/assets/avatars/avatar-7.jpg";
import avatar8 from "@/assets/avatars/avatar-8.jpg";
import defaultAvatar from "@/assets/profile-photo.jpg";

export const AVATARS: { id: string; src: string; label: string }[] = [
  { id: "default", src: defaultAvatar, label: "Default" },
  { id: "1", src: avatar1, label: "Avatar 1" },
  { id: "2", src: avatar2, label: "Avatar 2" },
  { id: "3", src: avatar3, label: "Avatar 3" },
  { id: "4", src: avatar4, label: "Avatar 4" },
  { id: "5", src: avatar5, label: "Avatar 5" },
  { id: "6", src: avatar6, label: "Avatar 6" },
  { id: "7", src: avatar7, label: "Avatar 7" },
  { id: "8", src: avatar8, label: "Avatar 8" },
];

export function getAvatarSrc(avatarId: string): string {
  return AVATARS.find((a) => a.id === avatarId)?.src ?? defaultAvatar;
}
