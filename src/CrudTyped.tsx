interface IRoutes {
  id: string;
  userId: string;
  name: string;
  waypoints: WayPoints[];
  createdAt: Date;
  updatedAt: Date;
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

class RouteService {
  // the data
  private routes: IRoutes[] = [];

  // the actions
  createRoute(input: CreateRoute): ApiResponse<IRoutes> {
    if (!input.name || !input.waypoints) {
      return {
        success: false,
        error: "Missing route name or waypoints",
      };
    }

    const newRoute: IRoutes = {
      ...input,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.routes.push(newRoute);

    return {
      success: true,
      data: newRoute,
    };
  }
}
