// StartCode Logo Component - Uses the actual favicon SVG
const Logo = ({ size = 40, className = '' }) => {
    return (
        <img
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt="StartCode"
            width={size}
            height={size}
            className={className}
            style={{
                display: 'block',
                borderRadius: size * 0.125,
            }}
        />
    );
};

export default Logo;
