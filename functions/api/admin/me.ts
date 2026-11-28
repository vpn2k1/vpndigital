import { json, type Handler } from './_lib';

export const onRequestGet: Handler = ({ data }) => json({ email: data.email, role: data.role });
