import { Box, Typography, Stack } from "@mui/material";
import {
  ArrowCircleUpRounded,
  ArrowCircleDownRounded,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const TotalInvestments = () => {
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalInvestmentsSeries, setTotalInvestmentsSeries] = useState<
    { name: string; data: number[] }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/projects");
        const data = await response.json();

        let grandTotalInvestments = 0;

        const projectsByYear: Record<string, number> = {};

        data.forEach((project: any) => {
          const year = new Date(project.duration.startDate)
            .getFullYear()
            .toString();
          if (!projectsByYear[year]) {
            projectsByYear[year] = 0;
          }
          projectsByYear[year] += project.fund;
          grandTotalInvestments += project.fund;
        });

        const seriesData: { name: string; data: number[] }[] = [];

        Object.entries(projectsByYear)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .forEach(([year, fund]) => {
            seriesData.push({ name: year, data: [fund] });
          });

        setTotalInvestmentsSeries(seriesData);
        setTotalInvestments(grandTotalInvestments);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentageChange = (): number => {
    if (totalInvestmentsSeries.length < 2) {
      return 0;
    }

    const latestYearFund =
      totalInvestmentsSeries[totalInvestmentsSeries.length - 1].data[0];
    const prevYearFund =
      totalInvestmentsSeries[totalInvestmentsSeries.length - 2].data[0];

    const percentageChange =
      ((latestYearFund - prevYearFund) / prevYearFund) * 100;

    return parseFloat(percentageChange.toFixed(2));
  };
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    colors: ["#48C4D3", "#D47D17"],
    stroke: {
      width: 4,
    },
    xaxis: {
      title: {
        text: "Years",
      },
      categories: totalInvestmentsSeries.map((item) => item.name),
    },
    yaxis: {
      title: {
        text: "Total Investments",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `₱ ${val.toLocaleString()}`,
      },
    },
  };
  const seriesData = [
    {
      name: "Total Investments",
      data: totalInvestmentsSeries.map((item: any) => item.data[0]),
    },
  ];
  return (
    <Box
      p={4}
      flex={1}
      bgcolor="#f6f6f6"
      id="chart"
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Investments
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          ₱{totalInvestments.toLocaleString()}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          {calculatePercentageChange() > 0 ? (
            <ArrowCircleUpRounded
              sx={{
                fontSize: 25,
                color: "#D47D17",
              }}
            />
          ) : (
            <ArrowCircleDownRounded
              sx={{
                fontSize: 25,
                color: "#D47D17",
              }}
            />
          )}
          <Stack>
            <Typography fontSize={15} color="#D47D17">
              {calculatePercentageChange()}%
            </Typography>
            <Typography fontSize={12} color="#808191">
              Than Last Year
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {totalInvestmentsSeries.length > 0 && (
        <ReactApexChart
          options={options}
          series={seriesData}
          type="line"
          height={310}
          color="#000"
        />
      )}
    </Box>
  );
};

export default TotalInvestments;
