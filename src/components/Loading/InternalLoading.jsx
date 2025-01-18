import { FallingLines } from "react-loader-spinner";

const InternalLoading = () => {
  return (
    <div className='w-full h-full  flex items-center justify-center'>
      <FallingLines
        color="#1F4529"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default InternalLoading;
