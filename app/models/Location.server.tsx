import { LocationType, sampleLocation, emptyLocation } from "../routes/app.locations.$id/defines";

export const LocationModel = {
  validate: (data) => {
    const errors = {};
    // TODO
    
    if (!data.address1) {
      errors.address1 = "The address1 is required.";
    }

    if (Object.keys(errors).length) {
      return errors;
    }
  },
  
  create: async (data) => {
    // TODO

    return { location: sampleLocation, input: data };
  },
  
  update: async (data) => {
    // TODO
  
    return { location: sampleLocation, input: data };
  },
}