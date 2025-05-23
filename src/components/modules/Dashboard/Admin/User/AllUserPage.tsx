"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUser } from "@/services/user";
import { TAuthor } from "@/types";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

// address: "West Datta Para";
// createdAt: "2025-05-11T15:59:04.156Z";
// email: "mamudmdemon@gmail.com";
// id: "1f31ecc3-072f-4e84-9448-7afec7adca10";
// image: "https://res.cloudinary.com/dyyhkoj7b/image/upload/v1746979152/zogltga0matatwf24goh.png";
// isDeleted: false;
// name: "Umayer Emon";
// needsPasswordChange: true;
// password: "$2b$10$uPMNxUSj76AmcnCLIPfROeRH7DVwugM2KMgJIcTgSV43vFlSVSOx2";
// role: "member";
// updatedAt: "2025-05-11T17:21:02.796Z";

const AllUserPage = () => {
  const [users, setUsers] = useState<TAuthor[] | []>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUser();
      if (res?.success) {
        setUsers(res.data)
      }
    }
    fetchUsers()
  }, [])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">All User List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>User Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>

              <TableCell>
                <p>
                  <Trash color="red" />
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUserPage;
