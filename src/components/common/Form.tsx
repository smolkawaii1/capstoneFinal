import React from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { FormProps } from "interfaces/common";
import CustomButton from "./customButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateRangePicker,
  LocalizationProvider,
  DateRange,
} from "@mui/x-date-pickers-pro";
import { useState } from "react";
const Form = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
  onFinish,
}: FormProps) => {
  const [value, setValue] = useState<DateRange<Date>>([null, null]);
  const onFinishWrapper = async (data: any) => {
    const formData = {
      ...data,
      duration: {
        startDate: value[0],
        endDate: value[1],
      },
    };

    await onFinish(formData);
  };
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Project
      </Typography>

      <Box
        mt={2.5}
        borderRadius="15px"
        padding="20px"
        sx={{ backgroundColor: "#f6f6f6" }}
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishWrapper)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Project Title *
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("title", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Enter Description *
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              placeholder="Write project description"
              color="info"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("description", { required: false })}
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Allocated Fund *
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              type="number"
              variant="outlined"
              {...register("fund", { required: true })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Project Duration *
              </FormHelperText>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  localeText={{ start: "Date Started", end: "Date Ended" }}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue as DateRange<Date>);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Project Status *
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="Status"
                {...register("status", { required: true })}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="On-going">On-going</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Fund Source *
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("source", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Proponent/s *
            </FormHelperText>
            <TextField
              fullWidth
              required
              placeholder="Separate with comma..."
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("proponent", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Select Project Sector *
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue="Select Sector"
              {...register("sectorType", { required: true })}
            >
              <MenuItem value="AANR">
                Agriculture, Aquatic and Natural Resources Sector(AANR)
              </MenuItem>
              <MenuItem value="DRRCCA">
                Disaster Risk Reduction and Climate Change Adaptation(DRR CCA)
              </MenuItem>
              <MenuItem value="IEET">
                Industry, Energy and Emerging Technology(IEET)
              </MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="NIBRA">
                National Integrated Basic Research Agenda(NIBRA)
              </MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>
          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#48C4D3"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
