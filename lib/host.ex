defmodule DoubleAuction.Host do
  def filter_data(data) do
    rule = %{
      mode: true,
      participants: "users",
      buyer_bids: {"buyerBids", %{
        id: true,
        bid: true,
      }},
      seller_bids: {"sellerBids", %{
        id: true,
        bid: true,
      }},
      deals: %{
        id: true,
        deal: true,
      },
      highest_bid: "highestBid",
      lowest_bid: "lowestBid",
      highest_bid: "highestBid",
      lowest_bid: "lowestBid",
    }
    data
    |> Transmap.transform(rule)
  end

  def start(data) do
    %{data | started: true}
  end

  def stop(data) do
    %{data | started: false}
  end

  def change_mode(data, mode) do
    %{data | mode: mode}
  end

  def match(data) do
    participants = Enum.shuffle(data.participants) |> Enum.map_reduce(1, fn {id, participant}, acc ->
      if rem(acc, 2) == 0 do
        new_participant = %{
          role: "buyer",
          money: acc * data.price_base,
          bidded: false,
          bid: nil,
          dealt: false,
          deal: nil
        }
      else
        new_participant = %{
          role: "seller",
          money: acc * data.price_base,
          bidded: false,
          bid: nil,
          dealt: false,
          deal: nil
        }
      end
      {{id, new_participant}, acc + 1}
    end) |> elem(0) |> Enum.into(%{})
    %{data | participants: participants,
     buyer_bids: [], seller_bids: [], deals: [],
     highest_bid: nil, lowest_bid: nil }
  end

  def fetch_contents(data) do
    action = %{
      type: "RECEIVE_CONTENTS",
      payload: filter_data(data)
    }
    {:ok, %{data: data, host: %{action: action}}}
  end
end
