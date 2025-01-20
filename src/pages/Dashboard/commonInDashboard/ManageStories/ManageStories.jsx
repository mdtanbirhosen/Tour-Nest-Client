import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const ManageStories = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stories = [], refetch } = useQuery({
    queryKey: ["specific-stories", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const response = await axiosSecure(`/stories?email=${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/stories/${id}`);
          await refetch();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting story:", error);
          Swal.fire("Error", "Failed to delete the story.", "error");
        }
      }
    });
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/touristDashboard/editStory/${id}`); // Navigate to the edit page
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Stories</h2>
      {stories.length === 0 ? (
        <p className="text-gray-500 text-2xl font-bold mt-10 text-center">
          You haven&apos;t added any stories yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.map((story) => (
            <div
              key={story._id}
              className="p-4 bg-white shadow rounded overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
              <p className="text-gray-600 mb-4">{story.description}</p>
              <div className="flex gap-2 overflow-x-scroll">
                {story.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Story ${index}`}
                    className="w-24 h-24 rounded object-cover"
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(story._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStories;
