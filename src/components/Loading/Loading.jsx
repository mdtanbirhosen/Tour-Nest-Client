import {Watch} from 'react-loader-spinner'
const Loading = () => {
    return (
        <div className='w-full h-screen bg-black bg-opacity-20 flex items-center justify-center'>
            <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
        </div>
    );
};

export default Loading;