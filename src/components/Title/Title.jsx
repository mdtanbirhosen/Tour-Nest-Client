import PropTypes from "prop-types";

const Title = ({title, subTitle}) => {
    return (
        <div className="w-full text-center py-3 md:py-5">
            <h3 className="text-primary-color font-bold text-xl md:text-2xl lg:text-3xl">{title}</h3>
            <p className="text-secondary-color max-w-2xl mx-auto text-xs md:text-sm lg:text-base">{subTitle}</p>
        </div>
    );
};

Title.propTypes ={
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
}

export default Title;