import Joi from "joi";
import elasticClient from "../service/elasticsearch";
import { Request, Response } from "express";
interface filterType {
  wifi: boolean;
  swimming_pool: boolean;
  fitness_center: boolean;
  spa_and_wellness: boolean;
  restaurant: boolean;
  room_service: boolean;
  bar_and_lounge: boolean;
  parking: boolean;
  concierge_services: boolean;
  pet_friendly: boolean;
  business_facilities: boolean;
  laundry_services: boolean;
  child_friendly_facilities: boolean;
}

export async function search(req: Request, res: Response) {
  const amenitiesSchema = Joi.object({
    wifi: Joi.boolean().required(),
    swimming_pool: Joi.boolean().required(),
    fitness_center: Joi.boolean().required(),
    spa_and_wellness: Joi.boolean().required(),
    restaurant: Joi.boolean().required(),
    room_service: Joi.boolean().required(),
    bar_and_lounge: Joi.boolean().required(),
    parking: Joi.boolean().required(),
    concierge_services: Joi.boolean().required(),
    pet_friendly: Joi.boolean().required(),
    business_facilities: Joi.boolean().required(),
    laundry_services: Joi.boolean().required(),
    child_friendly_facilities: Joi.boolean().required(),
  });

  const schema = Joi.object({
    location: Joi.string().required(),
    capacity:Joi.number().required(),
    aminites: amenitiesSchema.required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    // console.error();
    res.status(422).json(error.details);
  } else {
    await getLocation(value.location, value.capacity, {
      wifi: value.aminites.wifi,
      swimming_pool: value.aminites.swimming_pool,
      fitness_center: value.aminites.fitness_center,
      spa_and_wellness: value.aminites.spa_and_wellness,
      restaurant: value.aminites.restaurant,
      room_service: value.aminites.room_service,
      bar_and_lounge: value.aminites.bar_and_lounge,
      parking: value.aminites.parking,
      concierge_services: value.aminites.concierge_services,
      pet_friendly: value.aminites.pet_friendly,
      business_facilities: value.aminites.business_facilities,
      laundry_services: value.aminites.laundry_services,
      child_friendly_facilities: value.aminites.child_friendly_facilities,
    })
      .then((data) => {
        // console.log(data, "test");
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

async function getLocation(
  address: string = "",
  capacity: number = 1,
  filter: filterType
) {
  const client = elasticClient();

  try {
    const body = await client.search({
      index: "property_data",
      body: {
        query: {
          bool: {
            must: [
              { term: { "room.available": true } },
              { range: { "room.capacity": { gte: capacity } } },
              {
                multi_match: {
                  query: address,
                  fields: ["area", "state", "city"],
                },
              },
            ],
            filter: [],
            should: [
              { term: { "propertyId.property_aminite.wifi": filter.wifi } },
              {
                term: {
                  "propertyId.property_aminite.swimming_pool":
                    filter.swimming_pool,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.fitness_center":
                    filter.fitness_center,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.spa_and_wellness":
                    filter.spa_and_wellness,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.restaurant": filter.restaurant,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.room_service":
                    filter.room_service,
                },
              },
              {
                term: { "propertyId.property_aminite.parking": filter.parking },
              },
              {
                term: {
                  "propertyId.property_aminite.concierge_services":
                    filter.concierge_services,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.pet_friendly":
                    filter.pet_friendly,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.business_facilities":
                    filter.business_facilities,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.laundry_services":
                    filter.laundry_services,
                },
              },
              {
                term: {
                  "propertyId.property_aminite.child_friendly_facilities":
                    filter.child_friendly_facilities,
                },
              },
            ],
          },
        },
      },
    });
    return body.hits.hits;
  } catch (error) {
    console.error(error);
    // console.log(error);
    return null;
  }
}
