const digits = (s) => s.replace(/\D/g, "");
const orNull = (s) => s.trim() || null;
export function toPayload(data) {
    const location = data.location;
    const review = data.review;
    return {
        location: {
            cep: orNull(location.cep),
            street: location.street.trim(),
            number: orNull(location.number),
            complement: orNull(location.complement),
            neighborhood: orNull(location.neighborhood),
            city: location.city.trim(),
            state: location.state.toUpperCase(),
            latitude: Number(location.latitude.replace(",", ".")),
            longitude: Number(location.longitude.replace(",", ".")),
        },
        referralCode: orNull(review?.referralCode ?? ""),
    };
}
