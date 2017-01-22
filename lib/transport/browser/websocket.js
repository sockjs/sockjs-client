var DriverFunc;
var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	DriverFunc = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
}
export default DriverFunc;
