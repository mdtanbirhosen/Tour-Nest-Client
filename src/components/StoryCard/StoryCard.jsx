import PropTypes from "prop-types";
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { toast } from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const StoryCard = ({story}) => {
    const navigate = useNavigate()
    const {user} = useAuth()
    const handleShare = (storyUrl) => {
        console.log(storyUrl)
        if (!user) {
          toast.error('You need to be logged in to share a story!');
          navigate('/login');
        }
      };
  return (
    <div
      
      className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold">{story.title}</h3>
      <p className="text-gray-600">{story.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <FacebookShareButton
          url={story.url}
          quote={story.title}
          onClick={() => handleShare(story.url)}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </div>
  );
};
StoryCard.propTypes ={
    story: PropTypes.object.isRequired,
}
export default StoryCard;
