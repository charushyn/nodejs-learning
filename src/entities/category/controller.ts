import { CategoryType, CategoryModel } from "./model";
import { sendOkResponse, sendErrorResponse } from "../../responses";
import { Request, Response } from "express";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();

    sendOkResponse(res, 200, categories);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category: CategoryType = {
      name: req.body.name,
    };
    const category_response = await CategoryModel.create(category);

    sendOkResponse(res, 201, category_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      throw new Error(`No category was finded by ID:${categoryId}`);
    }

    sendOkResponse(res, 200, { category });
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const deleteCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;
    const category_response = await CategoryModel.findById(categoryId);

    if (!category_response) {
      throw new Error(`No category was finded by ID:${categoryId}`);
    }

    sendOkResponse(res, 204, null);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};

export const updateCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId: string = req.params.categoryId;

    const new_category_data: CategoryType = {
      name: req.body.name,
    };
    const category_response = await CategoryModel.findByIdAndUpdate(
      categoryId,
      new_category_data
    );

    if (!category_response) {
      throw new Error(`No category was finded by ID:${categoryId}`);
    }

    sendOkResponse(res, 204, category_response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      sendErrorResponse(res, error, 500);
    } else {
      sendErrorResponse(res, new Error("Unknown error"), 500);
    }
  }
};
