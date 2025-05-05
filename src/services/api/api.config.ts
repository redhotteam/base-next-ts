export interface BaseApiOptions extends RequestInit {
    headers?: Record<string, string>;
  }
  
  export interface ApiError {
    error: true;
    message?: string;
    status?: number;
    data?: any;
  }
  
  export type ApiResponse<T = any> = T | ApiError;
  
  export async function baseApi<T = any>(
    endpoint: string,
    options: BaseApiOptions = {}
  ): Promise<ApiResponse<T>> {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
    if (!baseUrl) {
      console.error("Environment variable NEXT_PUBLIC_BACKEND_URL is not defined.");
      return { error: true, message: "Missing backend URL" };
    }
  
    const url = `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
  
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          ...options.headers,
        },
      });
  
      let data: T | null = null;
  
      const contentType = response.headers.get("Content-Type");
  
      if (contentType?.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError: any) {
          console.error("Failed to parse JSON:", jsonError.message);
          const responseText = await response.text();
          console.error("Response body:", responseText);
        }
      } else {
        const responseText = await response.text();
        console.error("Non-JSON response received:", responseText);
        return { error: true, message: "Unexpected response format" };
      }
  
      if (!response.ok) {
        console.error("Fetch failed:", response.status, data || (await response.text()));
        return {
          error: true,
          status: response.status,
          data,
        };
      }
  
      return data ?? ({} as T);
    } catch (err: any) {
      console.error("Fetch error:", err.message);
      return { error: true, message: err.message };
    }
  }
  