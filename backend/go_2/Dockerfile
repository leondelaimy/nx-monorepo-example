# Build stage 
FROM golang:1.24 AS builder

WORKDIR /build

COPY backend/go_2/go.mod ./
RUN go mod download

COPY backend/go_2/*.go .

RUN CGO_ENABLED=0 GOOS=linux go build -o dist/backend/go_2

# Final stage
FROM alpine

COPY --from=builder /build/dist/backend/go_2 ./

CMD ["./go_2"]