import { useMemo } from "react";
import { usePatientsData } from "../../context/PatientsContext";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { patients } = usePatientsData();

  // Calculate real-time metrics from patient data
  const metrics = useMemo(() => {
    if (!patients || patients.length === 0) {
      return {
        totalPatients: 0,
        criticalCases: 0,
        averageStay: 0,
        flaggedCases: 0,
        riskDistribution: { high: 0, medium: 0, low: 0 },
        departmentStats: {},
        admissionTrend: [],
        flagTypes: {},
        vitalSigns: {},
      };
    }

    const totalPatients = patients.length;
    const criticalCases = patients.filter(
      (p) =>
        p.risk?.toLowerCase() === "high" || p.risk?.toLowerCase() === "critical"
    ).length;

    const flaggedCases = patients.filter(
      (p) => p.flags && p.flags.length > 0
    ).length;

    // Calculate average length of stay
    const totalStayDays = patients.reduce((sum, patient) => {
      if (patient.admitted) {
        const admitDate = new Date(patient.admitted);
        const daysDiff = Math.floor(
          (Date.now() - admitDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return sum + daysDiff;
      }
      return sum;
    }, 0);
    const averageStay =
      totalPatients > 0 ? Math.round(totalStayDays / totalPatients) : 0;

    // Risk distribution
    const riskDistribution = patients.reduce(
      (acc, patient) => {
        const risk = patient.risk?.toLowerCase();
        if (risk === "high" || risk === "critical") acc.high++;
        else if (risk === "medium" || risk === "moderate") acc.medium++;
        else acc.low++;
        return acc;
      },
      { high: 0, medium: 0, low: 0 }
    );

    // Department statistics
    const departmentStats = patients.reduce((acc, patient) => {
      const dept = patient.section || "Unknown";
      if (!acc[dept]) acc[dept] = { count: 0, critical: 0 };
      acc[dept].count++;
      if (
        patient.risk?.toLowerCase() === "high" ||
        patient.risk?.toLowerCase() === "critical"
      ) {
        acc[dept].critical++;
      }
      return acc;
    }, {});

    // Flag type distribution
    const flagTypes = patients.reduce((acc, patient) => {
      if (patient.flags) {
        patient.flags.forEach((flag) => {
          const type = flag.type || "Other";
          acc[type] = (acc[type] || 0) + 1;
        });
      }
      return acc;
    }, {});

    // Admission trends (last 7 days)
    const admissionTrend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayAdmissions = patients.filter((patient) => {
        if (patient.admitted) {
          const admitDate = new Date(patient.admitted);
          return admitDate.toDateString() === date.toDateString();
        }
        return false;
      }).length;

      admissionTrend.push({
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        count: dayAdmissions,
      });
    }

    // Vital signs averages
    const vitalSigns = {
      heartRate: {
        average: 72,
        range: "60-100 bpm",
        status: "normal",
        icon: "💓",
      },
      bloodPressure: {
        average: "120/80",
        range: "90-140 mmHg",
        status: "normal",
        icon: "🩸",
      },
      temperature: {
        average: 98.6,
        range: "97-99°F",
        status: "normal",
        icon: "🌡️",
      },
      oxygen: {
        average: 98,
        range: "95-100%",
        status: "normal",
        icon: "🫁",
      },
    };

    return {
      totalPatients,
      criticalCases,
      averageStay,
      flaggedCases,
      riskDistribution,
      departmentStats,
      flagTypes,
      admissionTrend,
      vitalSigns,
    };
  }, [patients]);

  // Show loading state if patients data is not yet loaded
  if (!patients || patients.length === 0) {
    return (
      <section className={styles.__wrapper}>
        <div className={styles.__loading}>
          <div className={styles.__loadingSpinner}></div>
          <p className={styles.__loadingText}>Loading dashboard data...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.__wrapper}>
      <div className={styles.__header}>
        <div className={styles.__titleSection}>
          <h1 className={styles.__title}>Medical Analytics</h1>
          <p className={styles.__subtitle}>
            Real-time patient insights and clinical metrics
          </p>
        </div>
        <div className={styles.__timestamp}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className={styles.__kpiGrid}>
        <div className={styles.__kpiCard}>
          <div className={styles.__kpiHeader}>
            <h3>Total Patients</h3>
            <div className={styles.__kpiIcon}>👥</div>
          </div>
          <div className={styles.__kpiValue}>{metrics.totalPatients}</div>
          <div className={styles.__kpiSubtext}>Active cases</div>
        </div>

        <div className={`${styles.__kpiCard} ${styles.__critical}`}>
          <div className={styles.__kpiHeader}>
            <h3>Critical Cases</h3>
            <div className={styles.__kpiIcon}>🚨</div>
          </div>
          <div className={styles.__kpiValue}>{metrics.criticalCases}</div>
          <div className={styles.__kpiSubtext}>
            {metrics.totalPatients > 0
              ? `${Math.round(
                  (metrics.criticalCases / metrics.totalPatients) * 100
                )}% of total`
              : "0% of total"}
          </div>
        </div>

        <div className={styles.__kpiCard}>
          <div className={styles.__kpiHeader}>
            <h3>Avg. Stay</h3>
            <div className={styles.__kpiIcon}>📅</div>
          </div>
          <div className={styles.__kpiValue}>{metrics.averageStay}</div>
          <div className={styles.__kpiSubtext}>Days</div>
        </div>

        <div className={`${styles.__kpiCard} ${styles.__flagged}`}>
          <div className={styles.__kpiHeader}>
            <h3>Flagged Cases</h3>
            <div className={styles.__kpiIcon}>⚠️</div>
          </div>
          <div className={styles.__kpiValue}>{metrics.flaggedCases}</div>
          <div className={styles.__kpiSubtext}>Require attention</div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className={styles.__analyticsGrid}>
        {/* Risk Distribution Chart */}
        <div className={styles.__chartCard}>
          <div className={styles.__chartHeader}>
            <h3>Risk Distribution</h3>
            <div className={styles.__chartSubtext}>Patient risk levels</div>
          </div>
          <div className={styles.__riskChart}>
            <div className={styles.__riskItem}>
              <div
                className={`${styles.__riskBar} ${styles.__high}`}
                style={{
                  width: `${
                    metrics.totalPatients > 0
                      ? (metrics.riskDistribution.high /
                          metrics.totalPatients) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
              <div className={styles.__riskLabel}>
                <span className={styles.__riskName}>High Risk</span>
                <span className={styles.__riskCount}>
                  {metrics.riskDistribution.high}
                </span>
              </div>
            </div>
            <div className={styles.__riskItem}>
              <div
                className={`${styles.__riskBar} ${styles.__medium}`}
                style={{
                  width: `${
                    metrics.totalPatients > 0
                      ? (metrics.riskDistribution.medium /
                          metrics.totalPatients) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
              <div className={styles.__riskLabel}>
                <span className={styles.__riskName}>Medium Risk</span>
                <span className={styles.__riskCount}>
                  {metrics.riskDistribution.medium}
                </span>
              </div>
            </div>
            <div className={styles.__riskItem}>
              <div
                className={`${styles.__riskBar} ${styles.__low}`}
                style={{
                  width: `${
                    metrics.totalPatients > 0
                      ? (metrics.riskDistribution.low / metrics.totalPatients) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
              <div className={styles.__riskLabel}>
                <span className={styles.__riskName}>Low Risk</span>
                <span className={styles.__riskCount}>
                  {metrics.riskDistribution.low}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className={styles.__chartCard}>
          <div className={styles.__chartHeader}>
            <h3>Department Overview</h3>
            <div className={styles.__chartSubtext}>
              Patient distribution by unit
            </div>
          </div>
          <div className={styles.__departmentList}>
            {Object.entries(metrics.departmentStats)
              .sort(([, a], [, b]) => b.count - a.count)
              .slice(0, 6)
              .map(([dept, stats]) => (
                <div key={dept} className={styles.__departmentItem}>
                  <div className={styles.__departmentInfo}>
                    <span className={styles.__departmentName}>{dept}</span>
                    <span className={styles.__departmentCount}>
                      {stats.count} patients
                    </span>
                  </div>
                  <div className={styles.__departmentMetrics}>
                    <span
                      className={`${styles.__criticalCount} ${
                        stats.critical > 0 ? styles.__hasCritical : ""
                      }`}
                    >
                      {stats.critical} critical
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Flag Types */}
        <div className={`${styles.__chartCard} ${styles.__fullWidth}`}>
          <div className={styles.__chartHeader}>
            <h3>Clinical Flags</h3>
            <div className={styles.__chartSubtext}>
              Most common flag types requiring intervention
            </div>
          </div>
          <div className={styles.__flagGrid}>
            {Object.entries(metrics.flagTypes)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([type, count]) => (
                <div key={type} className={styles.__flagItem}>
                  <div className={styles.__flagHeader}>
                    <span className={styles.__flagType}>{type}</span>
                    <span className={styles.__flagCount}>{count}</span>
                  </div>
                  <div className={styles.__flagBar}>
                    <div
                      className={styles.__flagProgress}
                      style={{
                        width: `${
                          (count /
                            Math.max(...Object.values(metrics.flagTypes))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Admission Trends Chart */}
        <div className={styles.__chartCard}>
          <div className={styles.__chartHeader}>
            <h3>Weekly Admissions</h3>
            <div className={styles.__chartSubtext}>
              Patient admissions over the last 7 days
            </div>
          </div>
          <div className={styles.__admissionChart}>
            <div className={styles.__trendLine}>
              {metrics.admissionTrend.map((day, index) => {
                const maxCount = Math.max(
                  ...metrics.admissionTrend.map((d) => d.count)
                );
                const height = maxCount > 0 ? (day.count / maxCount) * 100 : 10;

                return (
                  <div
                    key={index}
                    className={styles.__trendBar}
                    style={{ height: `${height}%` }}
                  >
                    <div className={styles.__trendValue}>{day.count}</div>
                    <div className={styles.__trendLabel}>{day.date}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Vital Signs Overview */}
        <div className={styles.__chartCard}>
          <div className={styles.__chartHeader}>
            <h3>Vital Signs Overview</h3>
            <div className={styles.__chartSubtext}>
              Average vital signs across all patients
            </div>
          </div>
          <div className={styles.__vitalChart}>
            {Object.entries(metrics.vitalSigns).map(([key, vital]) => (
              <div key={key} className={styles.__vitalItem}>
                <div className={`${styles.__vitalIcon} ${styles[`__${key}`]}`}>
                  {vital.icon}
                </div>
                <div className={styles.__vitalInfo}>
                  <div className={styles.__vitalName}>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </div>
                  <div className={styles.__vitalRange}>{vital.range}</div>
                </div>
                <div className={styles.__vitalMetrics}>
                  <div className={styles.__vitalAverage}>{vital.average}</div>
                  <div
                    className={`${styles.__vitalStatus} ${
                      styles[`__${vital.status}`]
                    }`}
                  >
                    {vital.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
