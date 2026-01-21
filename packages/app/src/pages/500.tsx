// TODO STARTUP: Replace this

export default function Custom500() {
	return (
		<div className="bg-gray-100 px-2 text-center">
			<div className="h-screen flex flex-col justify-center items-center">
				<h1 className="text-8xl font-extrabold text-red-500">
					Server Error
				</h1>

				<p className="text-xl text-gray-800 mt-4">
					We apologize for the inconvenience. Please try again later, or
					contact Drive Brand Studio support.
				</p>
				<a href="mailto:support@drivebrandstudio.com">
					support@drivebrandstudio.com
				</a>
				<a href="tel:16033563030">(1)603-356-3030</a>
			</div>
		</div>
	);
}
