interface IRoutes {
  id: string;
  userId: string;
  name: string;
  waypoints: WayPoints[];
  createdAt: Date;
  updateAt: Date;
}

type WayPoints = [latitude: number, longitude: number];

type CreateRoute = Omit<IRoutes, "id" | "createdAt" | "updateAt">;
type UpdateRoute = Partial<CreateRoute>;

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  error: string;
};

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
