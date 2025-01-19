import toast from "react-hot-toast";
import Button from "../../../../components/Button/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all applications on component mount
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure("/applications");
      console.log(res);
      return res.data;
    },
  });

  // Handle Accept Action (Update role and delete application)
  const handleAccept = async (applicationId, applicantEmail) => {
    console.log(applicationId, applicantEmail);
    try {
      // Update user role to "Tour Guide"
      const update = await axiosSecure.patch(`/user/${applicantEmail}`, {
        role: "tour guide",
      });
      console.log(update.data.modifiedCount);
      if (update.data.modifiedCount > 0) {
        const deletedData = await axiosSecure.delete(
          `/applications/${applicationId}`
        );
        console.log(deletedData);
        if (deletedData.data.deletedCount) {
            toast.success("Application accepted and user role updated!");
          refetch();
        }
      }

      
    } catch (error) {
      console.error("Failed to accept the application:", error);
      toast.error("Failed to accept the application.");
    }
  };

  // Handle Reject Action (Delete application)
  const handleReject = async (applicationId) => {
    try {
      // Delete the application
      const deletedData = await axiosSecure.delete(
        `/applications/${applicationId}`
      );
      console.log(deletedData);
      if (deletedData.data.deletedCount) {
        toast.success("Application rejected and deleted.");
        refetch();
      }
    } catch (error) {
      console.error("Failed to reject the application:", error);
      toast.error("Failed to reject the application.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center text-primary-color mb-4">
        Manage Candidates
      </h1>

      {/* Table for displaying the applications */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No applications available
              </td>
            </tr>
          ) : (
            applications.map((application) => (
              <tr key={application._id}>
                <td className="border p-2">{application.applicantName}</td>
                <td className="border p-2">{application.applicantEmail}</td>
                <td className="border p-2">{application.title}</td>

                <td className="border p-2 flex space-x-2">
                  <Button
                    text="Accept"
                    onClick={() =>
                      handleAccept(application._id, application.applicantEmail)
                    }
                  />
                  <Button
                    text="Reject"
                    onClick={() => handleReject(application._id)}
                    className="bg-red-500 text-white"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCandidates;

// const handleAccept = async (applicationId) => {
//     await fetch(`/applications/accept/${applicationId}`, { method: 'POST' });
//     setApplications(applications.filter(app => app._id !== applicationId));
//   };

//   const handleReject = async (applicationId) => {
//     await fetch(`/applications/reject/${applicationId}`, { method: 'POST' });
//     setApplications(applications.filter(app => app._id !== applicationId));
//   };
