interface IRoutes {
  id: string;
  userId: string;
  name: string;
  waypoints: WayPoints[];
  createdAt: Date;
  updatedAt: Date;
}

type WayPoints = [latitude: number, longitude: number];

type CreateRoute = Omit<IRoutes, "id" | "createdAt" | "updatedAt">;
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
  public createRoute(input: CreateRoute): ApiResponse<IRoutes> {
    if (!input || !input.waypoints) {
      return {
        success: false,
        error: "Invalid Input",
      };
    }

    const newRoute: IRoutes = {
      id: Math.random().toString(36).substring(2, 9),
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.routes.push(newRoute);
    return {
      success: true,
      data: newRoute,
    };
  }

  public getRouteById(id: string): ApiResponse<IRoutes> {
    const foundRoute = this.routes.find((route) => route.id === id);
    if (foundRoute) {
      return {
        success: true,
        data: foundRoute,
      };
    } else {
      return {
        success: false,
        error: "Route not found",
      };
    }
  }

  public updatedRoute(id: string, input: UpdateRoute): ApiResponse<IRoutes> {
    const foundRoute = this.routes.find((route) => route.id === id);

    if (!foundRoute) {
      return {
        success: false,
        error: "Route Not found",
      };
    }
    Object.assign(foundRoute, input, { updatedAt: new Date() });

    return {
      success: true,
      data: foundRoute,
    };
  }

  public deleteRoute(id: string): ApiResponse<boolean> {
    const originalLength = this.routes.length;

    this.routes = this.routes.filter((route) => route.id !== id);

    if (this.routes.length === originalLength) {
      return {
        success: false,
        error: "Route not found",
      };
    }

    return {
      success: true,
      data: true,
    };
  }
}
function deleteRoute(id: any, string: any) {
  throw new Error("Function not implemented.");
}
