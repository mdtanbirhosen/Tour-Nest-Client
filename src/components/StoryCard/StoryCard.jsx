import PropTypes from "prop-types";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
const StoryCard = ({ story={} }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleShare = (storyUrl) => {
    console.log(storyUrl);
    if (!user) {
      toast.error("You need to be logged in to share a story!");
      navigate("/login");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${story?.images[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`border rounded-lg  shadow-md hover:shadow-lg transition  bg-fixed `}
    >
<div className="text-primary-color bg-basic-bg hover:bg-black hover:text-white hover:bg-opacity-60 h-full w-full p-4 rounded-lg transition duration-300 ease-in-out border-2 border-gray-300">
        <h3 className="text-lg md:text-xl font-semibold text-center">
          {story?.title}
        </h3>
        <p className=" text-xs md:text-sm lg:text-base  ">
          {story?.text.split("").slice(0, 50)}...
          <span className="link-hover">see more</span>
        </p>
        <p className=" text-xs md:text-sm lg:text-base mt-1">
          <strong>Saying :</strong>
          {story.authorRole}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <p className="mr-2">
              <strong>Share With:</strong>
            </p>
            {user?<FacebookShareButton
              url={"https://www.facebook.com/"}
              quote={story?.title}
              onClick={() => handleShare(story?.url)}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>:
            
              <Link to={'/login'}>
                <FacebookIcon size={32} round />
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
StoryCard.propTypes = {
  story: PropTypes.object.isRequired,
};
export default StoryCard;
