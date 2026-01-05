import { UserRole } from "./types";

  export const roles = [
    {
      value: "brand" as const,
      title: "Brand",
      description: "Create campaigns, match and collaborate with creators",
    },
    {
      value: "creator" as const,
      title: "Creator",
      description: "Find gigs, match with brands and grow your portfolio",
    },
    {
      value: "admin" as const,
      title: "Admin",
      description: "Manage platform and moderate content",
    },
  ];

  export const selectedRoleInfo = ( selectedRole: UserRole ) => roles.find( ( r ) => r.value === selectedRole )!;