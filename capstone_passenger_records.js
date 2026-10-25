
const passengers = [
    {
        pnrCode: "VN001",
        passengerName: "Nguyen Van An",
        idNumber: "079123456789",
        flightNumber: "VN123",
        seatNumber: "",
        isCheckedIn: false
    },
    {
        pnrCode: "VN002",
        passengerName: "Tran Thi Binh",
        idNumber: "B12345678",
        flightNumber: "VN123",
        seatNumber: "",
        isCheckedIn: false
    }
];

const seats = [
    "12A", "12B", "12C",
    "13A", "13B", "13C",
    "14A", "14B", "14C",
    "15A", "15B", "15C"
];

function findPassengerByPnr(pnrCode) {
    return passengers.find(
        passenger => passenger.pnrCode.toUpperCase() === pnrCode.toUpperCase()
    );
}

function isValidIdNumber(idNumber) {
    const cccdPattern = /^\d{12}$/;
    const passportPattern = /^[A-Za-z]\d{7,8}$/;

    return cccdPattern.test(idNumber) || passportPattern.test(idNumber);
}

function isSeatTaken(flightNumber, seatNumber) {
    return passengers.some(
        passenger =>
            passenger.flightNumber === flightNumber &&
            passenger.seatNumber === seatNumber &&
            passenger.isCheckedIn === true
    );
}

function assignSeat(flightNumber) {
    for (let i = 0; i < seats.length; i++) {
        if (!isSeatTaken(flightNumber, seats[i])) {
            return seats[i];
        }
    }

    return null;
}

function addPassenger() {
    console.log("\n===== TIEP NHAN HO SO HANH KHACH =====");

    const pnrCode = prompt("Nhap ma PNR: ").trim().toUpperCase();

    if (pnrCode === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    if (findPassengerByPnr(pnrCode)) {
        console.log("Ma PNR da ton tai.");
        return;
    }

    const passengerName = prompt("Nhap ho ten hanh khach: ").trim();

    if (passengerName === "") {
        console.log("Ho ten khong duoc de trong.");
        return;
    }

    const idNumber = prompt("Nhap CCCD hoac Ho chieu: ").trim();

    if (!isValidIdNumber(idNumber)) {
        console.log("So CCCD/Ho chieu khong hop le.");
        console.log("CCCD: 12 chu so.");
        console.log("Ho chieu: 1 chu cai + 7-8 chu so.");
        return;
    }

    const flightNumber = prompt("Nhap so hieu chuyen bay: ").trim().toUpperCase();

    if (flightNumber === "") {
        console.log("So hieu chuyen bay khong duoc de trong.");
        return;
    }

    passengers.push({
        pnrCode: pnrCode,
        passengerName: passengerName,
        idNumber: idNumber,
        flightNumber: flightNumber,
        seatNumber: "",
        isCheckedIn: false
    });

    console.log("Da them ho so hanh khach thanh cong.");
}

function verifyPassenger(passenger) {
    console.log("\n===== XAC THUC HANH KHACH =====");

    if (!isValidIdNumber(passenger.idNumber)) {
        console.log("Giay to tuy than khong hop le.");
        return false;
    }

    console.log("Xac thuc giay to: HOP LE");
    console.log("PNR: " + passenger.pnrCode);
    console.log("Hanh khach: " + passenger.passengerName);
    console.log("Giay to: " + passenger.idNumber);
    console.log("Chuyen bay: " + passenger.flightNumber);

    return true;
}

function checkInPassenger() {
    console.log("\n===== CHECK-IN HANH KHACH =====");

    const pnrCode = prompt("Nhap ma PNR: ").trim().toUpperCase();

    if (pnrCode === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Khong tim thay ho so hanh khach.");
        return;
    }

    if (passenger.isCheckedIn) {
        console.log("Hanh khach da check-in.");
        console.log("So ghe: " + passenger.seatNumber);
        return;
    }

    if (!verifyPassenger(passenger)) {
        console.log("Khong the tiep tuc check-in.");
        return;
    }

    const seatNumber = assignSeat(passenger.flightNumber);

    if (!seatNumber) {
        console.log("Chuyen bay da het cho.");
        return;
    }

    passenger.seatNumber = seatNumber;
    passenger.isCheckedIn = true;

    console.log("\nCheck-in thanh cong.");
    console.log("So ghe duoc cap: " + passenger.seatNumber);

    displayBoardingPass(passenger);
}

function displayBoardingPass(passenger) {
    console.log("\n================================================");
    console.log("|              BOARDING PASS                  |");
    console.log("================================================");
    console.log("| PNR          : " + passenger.pnrCode);
    console.log("| HANH KHACH   : " + passenger.passengerName);
    console.log("| CHUYEN BAY   : " + passenger.flightNumber);
    console.log("| SO GHE       : " + passenger.seatNumber);
    console.log("| TRANG THAI   : CHECKED IN");
    console.log("------------------------------------------------");
    console.log("| BARCODE      : ||| || |||| | ||| || |||| |");
    console.log("|              : || ||| | || |||| || | ||| |");
    console.log("================================================");
}

function searchPassenger() {
    console.log("\n===== TRA CUU HANH KHACH =====");

    const pnrCode = prompt("Nhap ma PNR: ").trim().toUpperCase();

    if (pnrCode === "") {
        console.log("Ma PNR khong duoc de trong.");
        return;
    }

    const passenger = findPassengerByPnr(pnrCode);

    if (!passenger) {
        console.log("Khong tim thay hanh khach.");
        return;
    }

    console.log("----------------------------------------");
    console.log("PNR          : " + passenger.pnrCode);
    console.log("Hanh khach   : " + passenger.passengerName);
    console.log("Giay to      : " + passenger.idNumber);
    console.log("Chuyen bay   : " + passenger.flightNumber);
    console.log("So ghe       : " + (passenger.seatNumber || "Chua cap"));
    console.log(
        "Check-in     : " +
        (passenger.isCheckedIn ? "Da check-in" : "Chua check-in")
    );
    console.log("----------------------------------------");
}

function displayPassengers() {
    console.log("\n===== DANH SACH HANH KHACH =====");

    if (passengers.length === 0) {
        console.log("Chua co ho so hanh khach.");
        return;
    }

    console.log(
        "PNR".padEnd(10) +
        "Hanh khach".padEnd(22) +
        "Chuyen bay".padEnd(14) +
        "So ghe".padEnd(10) +
        "Trang thai"
    );

    console.log("---------------------------------------------------------------");

    passengers.forEach(passenger => {
        console.log(
            passenger.pnrCode.padEnd(10) +
            passenger.passengerName.padEnd(22) +
            passenger.flightNumber.padEnd(14) +
            (passenger.seatNumber || "Chua cap").padEnd(10) +
            (passenger.isCheckedIn ? "CHECKED_IN" : "NOT_CHECKED")
        );
    });
}

function main() {
    let choice;

    do {
        console.log("\n==========================================");
        console.log("   HE THONG QUAN LY HO SO HANH KHACH");
        console.log("==========================================");
        console.log("1. Tiep nhan ho so hanh khach");
        console.log("2. Xac thuc va Check-in");
        console.log("3. Tra cuu hanh khach");
        console.log("4. Hien thi danh sach");
        console.log("5. Thoat");
        console.log("==========================================");

        choice = prompt("Nhap lua chon: ");

        switch (choice) {
            case "1":
                addPassenger();
                break;

            case "2":
                checkInPassenger();
                break;

            case "3":
                searchPassenger();
                break;

            case "4":
                displayPassengers();
                break;

            case "5":
                console.log("Da thoat chuong trinh.");
                break;

            default:
                console.log("Lua chon khong hop le.");
        }
    } while (choice !== "5");
}

main();
