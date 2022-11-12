import request from "@/utils/request";

export function login(data) {
	return request({
		url: "/api/user/login",
		method: "post",
		data,
	});
}
export function info() {
	return request({
		url: "/api/user/info",
	});
}
export function logout() {
	return request({
		url: "/api/user/logout",
	});
}
export function menulist() {
	return request({
		url: "/api/user/menulist",
	});
}

export function arr() {
	return request({
		url: "/api/arr",
	});
}
