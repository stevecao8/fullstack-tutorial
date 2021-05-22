import { gql, useQuery } from "@apollo/client";
import { RouteComponentProps } from "@reach/router";
import React, { Fragment } from "react";
import { Header, LaunchTile, Loading } from "../components";
import { LAUNCH_TILE_DATA } from "./launches";
import * as GetMyTripsTypes from "./__generated__/GetMyTrips";


export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    me {
      id
      email
      trips {
        ...LaunchTile
      }
    }
  }
  ${LAUNCH_TILE_DATA}
`;

interface ProfileProps extends RouteComponentProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useQuery<GetMyTripsTypes.GetMyTrips>(
    GET_MY_TRIPS,
    // fetchPolicy  defines how Apollo Client uses the cache for a particular query
    // default is cahce-first, which means Apollo Client checks the cache to see
    // if the result is present before making network request, no network request if result is present
    // setting it to network-only gurantees that Apollo Client ALWAYS queries ever
    { fetchPolicy: "network-only" }
  );
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (data === undefined) return <p>ERROR</p>;

  return (
    <Fragment>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map((launch: any) => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </Fragment>
  );
};

export default Profile;
